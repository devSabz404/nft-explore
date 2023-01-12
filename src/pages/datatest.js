import React from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import { useQuery } from "react-query";
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const columns = [
  {
    title: "Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Title",
    dataIndex: "titles",
    key: "titles",
  },
  
  {
    title: "Price",
    dataIndex: "strPrice",
    key: "strPrice",
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
];

function AgencyAssets() {
  async function getTop() {
    let res = await axios.post(`${API_URL}/stats/agencyassets`);
    return res.data;
  }

  const topQuery = useQuery("top-creators", getTop);
  let topData = null;
  if (topQuery.status === "success") {
    topData = topQuery.data;
  }
  return (
    <>
      {topQuery.status === "error" && <p>Error</p>}
      {topQuery.status === "loading" && <p>Loading</p>}
      {topQuery.status === "success" && (
        <Table columns={columns} dataSource={topData} />
      )}
    </>
  );
}
export default AgencyAssets;
