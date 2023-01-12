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
import React, {useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import {  setUser } from "../core/dataSlice";

import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  
} from "antd";
import signinbg from "../assets/images/ViLA_Logo.png";


const { Title } = Typography;
const { Header,  Content } = Layout;


const API_URL = process.env.REACT_APP_API_ENDPOINT
export default function SignIn() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userI, setUserI] = useState({});
  
 function setDis(action){
  dispatch(setUser(action))
  return true;
 }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestURL = `${API_URL}/auth/login`;
    const userInfo = {email,password}
    const options = {
      headers: {
        'Content-Type': 'application/json',
       
      }
    }

    await axios.post(requestURL, userInfo, options)
      .then((response) => {
      console.log(response.data)
       localStorage.setItem('token',response.data.token)
       dispatch(setUser(response.data))
       window.location.replace('./dashboard')
      

       
      })
     
      
       
       
      .catch((err) => {
        console.log(err)
        // alert(`
        // Incorrect email or password
        // `);
      });
  }

 console.log("user in is",userI)
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-brand">
       
            </div>
           
            
          </Header>
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form
          
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                    onChange = {(e) =>setEmail(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    onChange = {(e) =>setPassword(e.target.value)}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  {/* <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item> */}

                  <Form.Item>
                    <Button
                   
                      htmlType="submit"
                      style={{ width: "100%",backgroundColor:"#660099" }}
                      onClick={handleSubmit}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                 
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
         
        </Layout>
      </>
    );
  }

