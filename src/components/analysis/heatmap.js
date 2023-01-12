import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const Heatmap = () => {
  const address = useSelector((state) => state.wallet);

  const asyncFetch = async () => {
    let res = await axios.post(`${API_URL}/nfts/getbyowneraddress`, address);
    return res.data;
  };
  const heatQuery = useQuery("heatQuery", asyncFetch);
  let viewsArray = [];
  let likesArray = [];
  let data = [];
  if (heatQuery.status === "success") {
    heatQuery.data.map((item) => {
      return viewsArray.push({
        asset: item.titles,
        value: item.views,
        type: "views",
      });
    });
    heatQuery.data.map((item) => {
      return likesArray.push({
        asset: item.titles,
        value: item.likes.length,
        type: "likes",
      });
    });

    data = viewsArray.concat(likesArray);
  }

  const config = {
    data,
    isStack: true,
    xField: "asset",
    yField: "value",
    seriesField: "type",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle'

      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };

  if (address === null || address === undefined) {
    return <div>Connect Wallet</div>;
  } else {
    return (
      <>
        {heatQuery.status === "error" && <p>Error Fetching data</p>}
        {heatQuery.status === "loading" && <p>Fetching data...</p>}
        {heatQuery.status === "success" && <Column {...config} />}
      </>
    );
  }
};
export default Heatmap;
