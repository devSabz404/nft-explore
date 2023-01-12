import React, { useRef, useState } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import Highlighter from "react-highlight-words";
import { CSVLink } from "react-csv";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

function TopPerfomers() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  async function getTop() {
    let res = await axios.post(`${API_URL}/stats/transfers1`);
    return res.data;
  }

  const topQuery = useQuery("top-creators", getTop);
  let topData = null;
  if (topQuery.status === "success") {
    topData = topQuery.data;
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",

      width: "30%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",

      sorter: (a, b) => a.value.length - b.value.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Wallet",
      dataIndex: "wallet",
      key: "wallet",
      width: "30%",
      ...getColumnSearchProps("wallet"),
    },
    {
      title: "Agency",
      dataIndex: "company",
      key: "company",
      width: "30%",
      ...getColumnSearchProps("company"),
    },
    {
      title: "View",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a href={`transactionhistroy/${record.wallet}`}>View</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      {topQuery.status === "error" && <p>Error</p>}
      {topQuery.status === "loading" && <p>Loading</p>}
      {topQuery.status === "success" && (
        <>
        <CSVLink data={topData}>CSV</CSVLink>
        <Table columns={columns} dataSource={topData} />
        </>
      )}
    </>
  );
}
export default TopPerfomers;
