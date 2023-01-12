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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import signinbg from "../assets/images/ViLA_Logo.png";

const { Title } = Typography;
const { Header, Content } = Layout;

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export default function SetPassword() {
  const role = "2";
  const paid = true;
  const company = useSelector((state) => state.biz);
  const user_name = useSelector((state) => state.fname);
  const email = useSelector((state) => state.inviteEmail);
  const newDate = new Date();
  const agreement_date = newDate.toDateString()
  console.log("Which page");

  const [formInput, setFormInput] = useState({
    first_name: "",
    lasr_name: "",

    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    const { first_name, last_name, phone, password } = formInput;
    const data = {
      user_name,
      first_name,
      last_name,
      company,
      email,
      phone,
      password,
      role,
      paid,
      agreement_date
    };
    e.preventDefault();
    await axios
      .post(`${API_ENDPOINT}/auth/register`, data)
      .then((res) => {
        if(res.data) window.location.replace(`./sign-in`);
        
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>NFT Explorer</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Register</Title>

              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="First name"
                  name="fname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                  onChange={(e) => {
                    setFormInput({ ...formInput, first_name: e.target.value });
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last name"
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                  onChange={(e) => {
                    setFormInput({ ...formInput, last_name: e.target.value });
                  }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                  onChange={(e) => {
                    setFormInput({ ...formInput, phone: e.target.value });
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  onChange={(e) => {
                    setFormInput({ ...formInput, password: e.target.value });
                  }}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    htmlType="submit"
                    style={{ backgroundColor: "#660099", color: "#FFFFFF" }}
                    onClick={handleSubmit}
                  >
                    Register
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
