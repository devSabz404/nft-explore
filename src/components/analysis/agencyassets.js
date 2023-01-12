import axios from "axios";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import React, { useRef, useState } from "react";

import { Space, Table, Tag, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Highlighter from "react-highlight-words";
const API_URL = process.env.REACT_APP_API_ENDPOINT;

function AgencyAssets() {
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

  const columns = [
    {
      title: "Title",
      dataIndex: "titles",
      key: "titles",
      width: "30%",
      ...getColumnSearchProps("titles"),
    },

    {
      title: "Price",
      dataIndex: "strPrice",
      key: "strPrice",
      sorter: (a, b) => a.address.strPrice - b.address.strPrice,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Collection",
      dataIndex: "collectionz",
      key: "collectionz",
      width: "30%",
      ...getColumnSearchProps("collectionz"),
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Auctioned",
      dataIndex: "auctioned",
      key: "auctioned",
    },
    {
      title: "View",
      key: "_id",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/asset-detail/${record._id}`}>View {record.name}</a>
        </Space>
      ),
    },
  ];

  async function getAss() {
    let res = await axios.post(`${API_URL}/stats/agencyassets`);
    return res.data;
  }

  const AgencyQuery = useQuery("agency", getAss);
  let topData = null;
  if (AgencyQuery.status === "success") {
    topData = AgencyQuery.data;
  }
  return (
    <>
      {AgencyQuery.status === "error" && <p>Error</p>}
      {AgencyQuery.status === "loading" && <p>Loading</p>}
      {AgencyQuery.status === "success" && (
      <>
      <CSVLink data={topData}>CSV</CSVLink>
        <Table columns={columns} dataSource={topData} />
      </>  
      )}
    </>
  );
}
export default AgencyAssets;
