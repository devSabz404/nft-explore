/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
function EChart() {

  const [assets,setAssets] = useState([]);
  const [loading,setLoading] = useState(true);
  

  const owner = useSelector((state) => state.wallet);
 
 async function getAssets(){
    if(owner){

    await axios.post(`${API_URL}/nfts/getassets`, {owner})
     .then((response)=> {
         console.log('thid is res',response.data);
         setAssets(response.data);
         setLoading(false);
     })
     .catch((error)=> {
         console.log(error);
     })

    }
 }


 useEffect(()=>{
    getAssets();
   },[owner]);

   let nfts = null;
  

if(!loading){	
    nfts = assets.ownedNfts
}


const  eChart = {
  series: [
    {
      name: "Assets",
      data: [6],
      color: "#fff",
    },
  ],

  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
       
        "Aug"
      ,
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },
};

  const { Title, Paragraph } = Typography;




  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Assets Owned</Title>
        <Paragraph className="lastweek">
          than last month <span className="bnb2">+100%</span>
        </Paragraph>
     
      </div>
    </>
  );
}

export default EChart;
