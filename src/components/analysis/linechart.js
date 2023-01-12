import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Select, Space, Card, Row } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { setSales } from "../../core/dataSlice";
import axios from "axios";

const { Option } = Select;
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
function Lines() {
  const dispatch = useDispatch();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState();
  const [assetOwner, setAssetOwner] = useState();
  const [collection, setCollection] = useState();
  const [option, setOption] = useState("All");
  const [selected, setSelect] = useState();

  const address = useSelector((state) => state.wallet);
  const role = useSelector((state) => state.user.role);
  const id = useSelector((state) => state.user._id);

  const handleChange = async (selectedOption) => {
    setOption(selectedOption);
    if (selectedOption === "creator") {
      await getCreators(id)
        .then(() => setSelect(creator))
        .catch((err) => console.log(err));
    } else if (selectedOption === "assets") {
      await getAssetsByOwner()
        .then(() => setSelect(assetOwner))
        .catch((err) => console.log(err));
    } else if (selectedOption === "collection") {
          getByCollection(id)
          
      
        
    }
  };


  async function getAssets() {
    if (address) {
      await axios
        .post(`${API_URL}/nfts/transactions`, { address })
        .then((response) => {
          console.log("thid is res", response.data);

          setAssets(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function getCreators(_id) {
    await axios
      .post(`${API_URL}/collection/getowner`, { _id })
      .then((res) => {
        console.log('fromfetchea',res.data)
       

        setAssetOwner(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getAssetsByOwner(id) {
    await axios
      .post(`${API_URL}/nfts/getbyownernfts`, { id })
      .then((res) => {
        console.log('fromfetchea',res.data)
        

        setCreator(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getByCollection(owner) {
    await axios
      .post(`${API_URL}/collection/getowner`, { owner })
      .then((res) => {
        console.log('fromfetchea',res.data)
        

        setCollection(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAssets();
  }, [address]);
  //getAssets();

  console.log("selected option", option);
  console.log("selected fetch option", collection);
  console.log("selected fetch option", selected);

  const removeItem = (a, b) => a.filter((x) => x.to !== b);
  let txns = null;
  let newArray = null;

  if (!loading) {
    txns = assets.transfers;

    newArray = removeItem(txns, contractAddress);
    const arr = newArray.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);
    dispatch(setSales(arr.toFixed(4)));
  }

  const data = newArray;

  const config = {
    data,
    height: 400,
    xField: "blockNum",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  const configAsset = {
    data,
    height: 400,
    xField: "blockNum",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  const configCreator = {
    data,
    height: 400,
    xField: "blockNum",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  const configCollection = {
    data,
    height: 400,
    xField: "blockNum",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (address === null || address === undefined) {
    return <div>Connect Wall</div>;
  } else {
    return (
      <>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card title="Filter By" size="small">
            <Row>
              <Space
                direction="horizantal"
                size="middle"
                style={{ display: "flex" }}
              >
                <Select
                  defaultValue="All"
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value={"asset"}>Asset</Option>
                  {role === "1" ? null : (
                    <Option value={"creator"}>Creator</Option>
                  )}

                  <Option value={"collection"}>Collection</Option>
                </Select>
                <Select defaultValue="All" style={{ width: 120 }}>
                 {collection&&collection.map((item,i)=><Option value="">Asset</Option>)} 
                 {creator&&creator.map((item,i)=><Option value="">Asset</Option>)} 
                 {assetOwner&&assetOwner.map((item,i)=><Option value="">Asset</Option>)} 
                 
                </Select>
              </Space>
            </Row>
          </Card>

          <Card title="Card" size="small">
            <Line {...config} />
          </Card>
        </Space>
      </>
    );
  }
}
export default Lines;
