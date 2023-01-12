import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { useSelector, useDispatch } from "react-redux";
import { setbought } from "../../core/dataSlice";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
function BoughtLines() {
  const dispatch = useDispatch();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const address = useSelector((state) => state.wallet);

  async function getAssets() {
    if (address) {
      await axios
        .post(`${API_URL}/nfts/bought`, { address })
        .then((response) => {
          console.log("thid is res of analysis", response.data);

          if (response.data.transfers.length > 0) {
            setAssets(response.data.transfers);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getAssets();
  }, [address]);
  //getAssets();

  const removeItem = (a, b) => a.filter((x) => x.to !== b);

  let data = null;

  if (!loading) {
    data = removeItem(assets, contractAddress);
    dispatch(setbought(data.length))
  }

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
  if (loading) {
    return <div>No Data Available</div>;
  }else if(address===null || address ===undefined){
    return <div>Connect Wallet</div>
  }
  else {
    return <Line {...config} />;
  }
}
export default BoughtLines;
