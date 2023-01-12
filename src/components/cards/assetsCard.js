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
  
  import { Link } from "react-router-dom";
  
  // Images

  import face2 from "../assets/images/face-2.jpg";

  const { Title } = Typography;
  
;
  // table code start
  const columns = [
    {
      title: "PREVIEW",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "COLLECTION",
      dataIndex: "function",
      key: "function",
    },
  
    {
      title: "PRICE",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "MINTED DATE",
      key: "employed",
      dataIndex: "employed",
    },
  ];
  


  // project table start
  const API_URL = process.env.REACT_APP_API_ENDPOINT
  function  AssetCard() {



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
   

    


let nfts = null;

if(!loading){	
    nfts = assets.ownedNfts
}

console.log('the assets',assets);
const data = []
if(!loading){
 
    
nfts.map((owned,index)=>{
        data.push({
            key: index,
            name: (
                <>
                  <Avatar.Group>
                    <Avatar
                      className="shape-avatar"
                      shape="square"
                      size={40}
                      src={owned.metadata.image}
                    ></Avatar>
                    <div className="avatar-info">
                      <Title level={5}>{owned.title}</Title>
                      <p></p>
                    </div>
                  </Avatar.Group>{" "}
                </>
              ),
              function: (
                <>
                  <div className="author-info">
                    <Title level={5}>{owned.metadata.collection ?? 'No collection'}</Title>
                   
                  </div>
                </>
              ),
              status:  (
                <>
                  <div className="author-info">
                    <Title level={5}>{`${owned.metadata.price} Eth` ?? '1 Eth'  }</Title>
                    
                  </div>
                </>
              ),
              employed: (
                <>
                  <div className="ant-employed">
                    <span>{owned.timeLastUpdated}</span>
                   
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
                title="Assets Owned"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">All</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
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

  
  export default AssetCard;
  