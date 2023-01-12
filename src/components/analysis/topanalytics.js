import React, { useState, useEffect } from "react";
import { Select, Space, Card, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const { Option } = Select;



function CollectionByLikes() {
    const { id } = useParams();
    let userInfo =id

    const getUser = async () =>{
        let res = await axios.post(`${API_URL}/auth/collectionaddress`, {userInfo});
          return res.data;
    }
    let address= null
    const userQuery = useQuery('userinfo',getUser)
    if(userQuery.status==="success"){
        address = userQuery.data.wallet
    }


  const getLikes = async () => {
    let res = await axios.post(`${API_URL}/collection/collectionaddress`, {
      address,
    });
    return res.data;
  };
  const likesQuery = useQuery("collectionLikes", getLikes);

  let likesData = likesQuery.data;
  let data = [];
  if (likesQuery === "success") {
    for (let i = 0; i < likesData.length; i++) {
      data.push({
        title: likesData[i].name,
        likes: likesData.likes.length,
      });
    }
  }

  const config = {
    data,
    xField: "title",
    yField: "likes",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };

  return (
    <>
      {likesQuery.status === "error" && <p>Error Fetching data</p>}
      {likesQuery.status === "loading" && <p>Fetching data...</p>}
      {likesQuery.status === "success" && <Column {...config} />}
    </>
  );
}

function CollectionByViews() {
    const { id } = useParams();
    let userInfo =id

    const getUser = async () =>{
        let res = await axios.post(`${API_URL}/auth/collectionaddress`, {userInfo});
          return res.data;
    }
    let address= null
    const userQuery = useQuery('userinfo',getUser)
    if(userQuery.status==="success"){
        address = userQuery.data.wallet
    }

  const getViews = async () => {
    
    let res = await axios.post(`${API_URL}/collection/collectionaddress`, {
      address,
    });
    return res.data;
  };
  const viewsQuery = useQuery("collectionLikes", getViews);

  let data = viewsQuery.data;

  const config = {
    data,
    xField: "name",
    yField: "views",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return (
    <>
      {viewsQuery.status === "error" && <p>Error Fetching data</p>}
      {viewsQuery.status === "loading" && <p>Fetching data...</p>}
      {viewsQuery.status === "success" && <Column {...config} />}
    </>
  );
}

function BySales() {
    const { id } = useParams();
    let userInfo =id

    const getUser = async () =>{
        let res = await axios.post(`${API_URL}/auth/collectionaddress`, {userInfo});
          return res.data;
    }
    let address= null
    const userQuery = useQuery('userinfo',getUser)
    if(userQuery.status==="success"){
        address = userQuery.data.wallet
    }
  
  const getAssets = async () => {
    let res = await axios.post(`${API_URL}/nfts/qtransactions`, { address });
    return res.data;
  };
  const salesQuery = useQuery("txns", getAssets);

  let data = salesQuery.data;

  const config = {
    data,
    xField: "blockNum",
    yField: "value",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };

  return (
    <>
      {salesQuery.status === "error" && <p>Error Fetching data</p>}
      {salesQuery.status === "loading" && <p>Fetching data...</p>}
      {salesQuery.status === "success" && <Column {...config} />}
    </>
  );
}

function ByViews() {
  const address = useSelector((state) => state.wallet);

  const fetchTop = async () => {
    let res = await axios.post(`${API_URL}/nfts/getbyowneraddress`, {
      address,
    });
    return res.data;
  };
  const txnsQuery = useQuery("txns", fetchTop);
  let data = txnsQuery.data;
  console.log(data);
  const config = {
    data,
    xField: "titles",
    yField: "views",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return (
    <>
      {txnsQuery.status === "error" && <p>Error Fetching data</p>}
      {txnsQuery.status === "loading" && <p>Fetching data...</p>}
      {txnsQuery.status === "success" && <Column {...config} />}
    </>
  );
}

function ByLikes() {
  const address = useSelector((state) => state.wallet);

  const fetchTop = async () => {
    let res = await axios.post(`${API_URL}/nfts/getbyowneraddress`, {
      address,
    });
    return res.data;
  };
  const txnsQuery = useQuery("txns1", fetchTop);
  let likesData = txnsQuery.data;
  let data = [];
  if (txnsQuery === "success") {
    for (let i = 0; i < likesData.length; i++) {
      data.push({
        title: likesData[i].titles,
        likes: likesData[i].like.length,
      });
    }
  }

  const config = {
    data,
    xField: "title",
    yField: "likes",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
  };
  return (
    <>
      {txnsQuery.status === "error" && <p>Error Fetching data</p>}
      {txnsQuery.status === "loading" && <p>Fetching data...</p>}
      {txnsQuery.status === "success" && <Column {...config} />}
    </>
  );
}

 export default function TopAnalytics({id}) {
  const useraddress = useSelector((state) => state.wallet);

  const [option, setOption] = useState("sales");
  const [optionMain, setOptionMain] = useState("asset");
  const [optionCollection, setOptionColletion] = useState("viewscollection");

  const roles = useSelector((state) => state.user.role);

  const handleChange = async (selectedOption) => {
    setOption(selectedOption);
  };
  const handleMainChange = async (selectedOption) => {
    setOptionMain(selectedOption);
  };
  const handleCollectionChange = async (selectedOption) => {
    setOptionColletion(selectedOption);
  };

  return (
    <>
    {!useraddress?<p>Connect Wallet</p>:

    
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card title="Filter By" size="small">
          <Row>
            <Space
              direction="horizantal"
              size="middle"
              style={{ display: "flex" }}
            >
              <Select
                defaultValue={"asset"}
                style={{ width: 120 }}
                onChange={handleMainChange}
              >
                <Option value={"asset"}>Assets</Option>
               
                  <Option value={"creator"}>Creators</Option>
                

                <Option value={"collection"}>Collections</Option>
              </Select>
              {optionMain === "asset" ? (
                <Select
                  defaultValue={"sales"}
                  onChange={handleChange}
                  style={{ width: 120 }}
                >
                  <Option value={"sales"}>Sales</Option>
                  <Option value={"views"}>Views</Option>
                  <Option value={"likes"}>Likes</Option>
                </Select>
              ) : null}
              {optionMain === "collection" ? (
                <Select
                  defaultValue={"views"}
                  onChange={handleCollectionChange}
                  style={{ width: 120 }}
                >
                  <Option value={"viewscollection"}>Views</Option>
                  <Option value={"likescollection"}>Likes</Option>
                </Select>
              ) : null}
            </Space>
          </Row>
        </Card>

        {/* selectedis asset */}
        {optionMain === "asset" && option === "sales" ? <BySales /> : null}
        {optionMain === "asset" && option === "views" ? <ByViews /> : null}
        {optionMain === "asset" && option === "likes" ? <ByLikes /> : null}

        {/* selceted is collection */}
        {optionMain === "collection" &&
        optionCollection === "viewscollection" ? (
          <CollectionByViews />
        ) : null}
        {optionMain === "collection" &&
        optionCollection === "likescollection" ? (
          <CollectionByLikes />
        ) : null}
      </Space>
}
    </>
  );
}
