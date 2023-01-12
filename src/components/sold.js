import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSold } from "../core/dataSlice";
import { Row, Col, Card, Radio, Table, Typography, Button, Input } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { CSVLink } from "react-csv";

const { Title } = Typography;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const API_URL = process.env.REACT_APP_API_ENDPOINT;

function Transactions() {
  const dispatch = useDispatch();
  
  const fetchSold = async () => {
    const res = await axios.post(`${API_URL}/nfts/transactions`, { address });
    return res.data;
  };

  const address = useSelector((state) => state.wallet);
  const soldQuery = useQuery("sold", fetchSold);

  const columns = [
    {
      title: "Value",
      dataIndex: "value",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.value.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "From",
      dataIndex: "from",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.from === value;
      },
    },
    {
      title: "To",
      dataIndex: "to",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.to.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];

  const removeItem = (a, b) => a.filter((x) => x.to !== b);
  let data = null;
  let newArray = null;

  if (soldQuery.status === "success") {
    data = soldQuery.data.transfers;

    newArray = removeItem(data, contractAddress);
    dispatch(setSold(newArray));
  }
  const headers = [
    { label: "Value", key: "value" },
    { label: "From", key: "from" },
    { label: "To", key: "to" },
  ];

  if (address === null || address === undefined)
    return <div>Connect Wallet</div>;

  return (
    <>
      <div className="tabled">
      {!data ? null : (
          <CSVLink data={data} headers={headers}>
            Export CSV
          </CSVLink>
        )}
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Sold Items"
            >
              <div className="table-responsive">
                {soldQuery.status === "error" && <p>Error Fetching data</p>}
                {soldQuery.status === "loading" && <p>Fetching data...</p>}
                {soldQuery.status === "success" && (
                  <Table
                    columns={columns}
                    dataSource={newArray}
                    pagination={true}
                    className="ant-border-space"
                    scroll={{ x: 1300 }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Transactions;
