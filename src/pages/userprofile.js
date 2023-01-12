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
import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function UserProfile() {
  const history = useHistory();
  const [imageURL, setImageURL] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userError, setError] = useState(false);
  const [collection, setCollection] = useState([]);
  const [user, setUsers] = useState({});
  const id = useParams();
  const userInfo = id.id;

  async function getPendingUsers() {
    await axios
      .post(`${API_ENDPOINT}/auth/getuser`, { userInfo })
      .then((res) => {
        setUsers(res.data);
        axios
          .post(`${API_ENDPOINT}/api/getownercollection`, { userInfo })
          .then((res) => {
            setCollection(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getPendingUsers();
  }, []);

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (user[0].role === "1") {
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
                    <Avatar size={74} shape="square" src={profilavatar} />

                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">
                        {user
                          ? user[0].user_name ?? user[0].first_name
                          : "User name"}
                      </h4>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Radio.Group defaultValue="a">
                    <Radio.Button value="a">OVERVIEW</Radio.Button>
                    <Radio.Button value="b">COLLECTION</Radio.Button>
                    <Radio.Button value="c">ASSETS</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            }
          ></Card>

          <Row gutter={[24, 0]}>
            <Col span={24} md={8} className="mb-24">
              <Card
                bordered={false}
                title={
                  <h6 className="font-semibold m-0">Profile Information</h6>
                }
                className="header-solid h-full card-profile-information"
                extra={<Button type="link">{pencil}</Button>}
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <p className="text-dark">{"Bio "}</p>
                <hr className="my-25" />
                <Descriptions>
                  <Descriptions.Item label="Mobile" span={3}>
                    {user ? user[0].phone : "User name"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {user ? user[0].email : "User name"}
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
          <Card
            bordered={false}
            className="header-solid mb-24"
            title={
              <>
                <h6 className="font-semibold">COLLECTIONS</h6>
              </>
            }
          >
            <Row gutter={[24, 24]}>
              {collection.map((p, index) => (
                <Col span={24} md={12} xl={6} key={index}>
                  <Card
                    bordered={false}
                    className="card-project"
                    cover={<img alt="example" src={p.banner} />}
                  >
                    <div className="card-tag">{p.name}</div>
                    <h5>{p.titile}</h5>
                    <p>{p.disciption}</p>
                    <Row gutter={[6, 0]} className="card-footer">
                      <Col span={12}>
                        <Link to={`/collection/${p._id}`}>
                          <Button type="button">VIEW COLLECTION</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </>
      );
    } else {
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
                    <Avatar size={74} shape="square" src={user.photo} />

                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">
                        {user
                          ? user[0].user_name ?? user[0].first_name
                          : "User name"}
                      </h4>
                    </div>
                  </Avatar.Group>
                </Col>
                <Col
                  span={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                 
                </Col>
              </Row>
            }
          ></Card>

          <Row gutter={[24, 0]}>
            <Col span={24} md={8} className="mb-24">
              <Card
                bordered={false}
                title={
                  <h6 className="font-semibold m-0">Profile Information</h6>
                }
                className="header-solid h-full card-profile-information"
                extra={<Button type="link">{pencil}</Button>}
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <p className="text-dark">{"Bio "}</p>
                <hr className="my-25" />
                <Descriptions>
                  <Descriptions.Item label="Mobile" span={3}>
                    {user ? user[0].phone : "User name"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {user ? user[0].email : "User name"}
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
          <Card
            bordered={false}
            className="header-solid mb-24"
            title={
              <>
                <h6 className="font-semibold">Collections</h6>
              </>
            }
          >
            <Row gutter={[24, 24]}>
              {collection.map((p, index) => (
                <Col span={24} md={12} xl={6} key={index}>
                  <Card
                    bordered={false}
                    className="card-project"
                    cover={<img alt="example" src={p.banner} />}
                  >
                      <Link to={`/collection/${p._id}`}>
                    <div className="card-tag">{p.name}</div>
                    <h5>{p.titile}</h5>
                    <p>{p.disciption}</p>
                    <Row gutter={[6, 0]} className="card-footer">
                      <Col span={12}>
                      
                         
                       
                      </Col>
                    </Row>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>

          </Card>
        </>
      );
    }
  }
}

export default UserProfile;
