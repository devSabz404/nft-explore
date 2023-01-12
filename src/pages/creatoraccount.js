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
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../components/cards/imagecard";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
 Typography,
  Table
  
} from "antd";


import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,

} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import {useParams} from "react-router-dom";
const { Title } = Typography;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
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


function CreatorAccount() {
  const { id } = useParams();

  const [creator,setCreator] = useState([]);
  const [wallet,setWallet] = useState("");
  const [collection,setCollection] = useState([]);
  const [imageURL, setImageURL] = useState(false);
  const [userloading, setUserLoading] = useState(true);
  const [collectionloading, setCollectionLoading] = useState(true);
  const [openCollection, setOpenCollections] = useState(false);
  const [overview, setOverView] = useState();
  const [walletAssets,setWalletAssets] = useState([]);
  const [assets, setAssets] = useState(false);
  const [caution,setCaution] = useState("");
  const [assetloading,setAssetsLoading] = useState(true);
  
//creator account start
  async function getCreator() {
   let userInfo = id
    
    await axios.post(`${API_ENDPOINT}/auth/getuser`, {userInfo})
    .then((res) => {
        console.log(res.data);
        setCreator(res.data);
        setUserLoading(false);
      
    })
    .catch((error) => {
        console.log(error);
    })
  }

  //collection start
  async function getCollection() {
    let userInfo = id
    await axios.post(`${API_ENDPOINT}/api/getownercollection`, { userInfo })
    .then((res) => {
       
      console.log(res.data);
      setCollection(res.data);
      setCollectionLoading(false);

    })
    .catch((error) => {
        console.log(error);
    })

  }





  let allData = null
  let creatorwallet = null
  let allowed = null

  if(!collectionloading && !userloading){
    allData = creator.concat(collection)
    creatorwallet = creator[0].wallet
    allowed = creator[0].allowAgency
}

console.log("the creator",creatorwallet);
console.log("the creator assets",walletAssets);

   //   assets start

    async function getAssets(){
        assets===false?setAssets(true):setAssets(false)
        if(creatorwallet){
            let owner = creatorwallet
            await axios.post(`${API_ENDPOINT}/nfts/getassets`, {owner})
         .then((response)=> {
             console.log('thid is res',response.data);
             setWalletAssets(response.data);
             setAssetsLoading(false);
             
         })
         .catch((error)=> {
             console.log(error);
         })
        }else{
            setCaution("You are not allowed to view assets by the creator page")
        }
 
        
     }





//   console.log("this is all",allData);


useEffect(()=>{
    getCreator();
    getCollection();	
},[])

let nfts = null;

if(!assetloading){	
    nfts = walletAssets.ownedNfts
}

console.log('the assets',caution);
const data = []
if(!assetloading){
 
    
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






  




  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      
    
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={"#"} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0"></h4>
                  
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={24}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
                 
                <div>
                    <Button onClick={()=>overview?setOverView(true):setOverView(true)} >Over View</Button>
                    <Button onClick={()=>openCollection===false?setOpenCollections(true):setOpenCollections(false)} >Collections</Button>
                    <Button onClick={()=>getAssets()} >Assets</Button>
                  
                  
                </div>
              
            </Col>
          </Row>
        }
      ></Card>
      
    
    
    {openCollection===true?
     <Row gutter={[24, 0]}>
       
     <Col span={24} md={24} className="mb-24">
       <Card
         bordered={false}
         title={<h6 className="font-semibold m-0">Collections</h6>}
         className="header-solid h-full card-profile-information"
     
         bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
       >
        
         <hr className="my-25" />
         <Row gutter={[24, 0]}>
              {collection.map((item, index) => {
                return (
                   <ImageCard
                    key={index}
                   src={item.banner}
                   alt={item.creator}
                   title={item.name}
                 
                   by={item.creator}
                   />
                   )

              })
              }
         
            
         </Row>
         
       </Card>
     </Col>
     
    
   </Row>:
   assets?
   <Row gutter={[24, 0]}>
       
   <Col span={24} md={24} className="mb-24">
     <Card
       bordered={false}
       title={<h6 className="font-semibold m-0">Assets</h6>}
       className="header-solid h-full card-profile-information"
   
       bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
     >
      
       <hr className="my-25" />
       <Row gutter={[24, 0]}>
        {
        
        
       <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Assets Owned"
              
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
        </div>}
       
          
       </Row>
       
     </Card>
   </Col>
   
  
 </Row>:
    creator && creator.map((user,index)=>{

        return(

    
      <Row gutter={[24, 0]}>
       
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Bio</h6>}
            className="header-solid h-full card-profile-information"
        
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              {" "}
              {user.bio}
             {" "}
            </p>
            <hr className="my-25" />
            <Descriptions title="Creater Details">
              <Descriptions.Item label="Full Name" span={3}>
                {user.user_name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user.user_phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {user.country}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        
       
      </Row>
        )
        
        })}
     
    </>
  );
}

export default CreatorAccount;
