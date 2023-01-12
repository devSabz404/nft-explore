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
import { SettingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

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




import BgProfile from "../assets/images/bg-profile.jpg";
;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;




function MyProfile() {
  

  const [creator,setCreator] = useState([]);
  const [userloading,setUserLoading] = useState(true);
  const userI = useSelector(state=>state.user._id)

//creator account start
  async function getCreator() {
   
    let userInfo = userI
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

















//   console.log("this is all",allData);


useEffect(()=>{
    getCreator();
  	
},[])








  




  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      
{creator && creator.map((user,index)=>{

return(
    <>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={user.photo} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0"></h4>
                  
                </div>
              </Avatar.Group>
            </Col>
        
          </Row>
        }
      >
         
      </Card>
      <SettingOutlined onClick={e=>{
        e.preventDefault();
        window.location.href="/edit";
      }}/>
      
    
    


   

    
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
            <Descriptions title="About">
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
              {/* <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item> */}
            </Descriptions>
          </Card>
        </Col>
        
       
      </Row>
      </>
        )
        
        })}
     
    </>
  );
}

export default MyProfile;
