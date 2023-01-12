import React from "react";

import { Space, Table, Tag } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const columns = [
  {
    title: "Time",
    dataIndex: "block_timestamp",
    key: "block_timestamp",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  
  {
    title: "Asset Address",
    dataIndex: "token_address",
    key: "token_address",
  },
  
  {
    title: "Asset ID",
    dataIndex: "token_id",
    key: "token_id",
  },
  {
    title: "Block Number",
    dataIndex: "block_number",
    key: "block_number",
  },


];

function TxnHistory() {
    const {id} = useParams()
    console.log("Iam",id)
  async function getTxn() {
   let owner = id
   let res =  await axios.post(`${API_URL}/stats/detailedtrans`,{owner});
    // let res = await axios.post(`${API_URL}/stats/detailedtrans`, {owner});
    return res.data;
  }

  const txnQuery = useQuery("txn-history", getTxn);
  let topData = null;
  if (txnQuery.status === "success") {
    topData = txnQuery.data;
  }
  console.log(topData)
  return (
    <>
      {txnQuery.status === "error" && <p>Error</p>}
      {txnQuery.status === "loading" && <p>Loading</p>}
      {txnQuery.status === "success" && (
        <Table columns={columns} dataSource={topData} />
      )}
    </>
  );
}
export default TxnHistory;
