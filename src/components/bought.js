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
import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux/es/exports";
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    
    Avatar,
    Typography,
  } from "antd";
import axios from "axios";
  
  

  const { Title } = Typography;
  
;
  // table code start
  const columns = [
    {
      title: "Block number",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "From",
      dataIndex: "function",
      key: "function",
    },
  
    {
      title: "To",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Value",
      key: "employed",
      dataIndex: "employed",
    },
  ];
  


  // project table start
 const API_URL = process.env.REACT_APP_API_ENDPOINT
  function Bought() {

    const [assets,setAssets] = useState([]);
    const [loading,setLoading] = useState(true);

     const address = useSelector(state => state.userinfo.wallet)
    
    
    async function getAssets(){
       if(address){

       await axios.post(`${API_URL}/nfts/bought`, {address})
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
      },[address]);
//getAssets();


let txns = null;

if(!loading){	
    txns = assets.transfers
}

console.log('the assets',assets);
const data = []
if(!loading){
 
    
txns.map((txn,index)=>{
        data.push({
            key: index,
            name: (
                <>
                
                    <div className="avatar-info">
                      <Title level={5}>{txn.blockNum}</Title>
                      <p></p>
                    </div>
                  
                </>
              ),
              function: (
                <>
                  <div className="author-info">
                    <Title level={5}>{txn.from}</Title>
                   
                  </div>
                </>
              ),
              status:  (
                <>
                  <div className="author-info">
                    <Title level={5}>{txn.to}</Title>
                    
                  </div>
                </>
              ),
              employed: (
                <>
                  <div className="ant-employed">
                    <span>{txn.value}</span>
                   
                  </div>
                </>
              ),
            

    })
})
}

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    if(loading){
        return <div>Loading...</div>
    }
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Transactions"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">CSV</Radio.Button>
                     
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={true }
                    className="ant-border-space"
                   
                  />
                </div>
              </Card>
  
          
            </Col>
          </Row>
        </div>
      </>
    );
  }

  
  export default Bought;
  