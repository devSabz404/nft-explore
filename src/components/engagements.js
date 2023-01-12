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
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Row, Col, Card, Radio, Table, Typography, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;

// table code start

// project table start
const API_URL = process.env.REACT_APP_API_ENDPOINT;
function Engagements() {
  const wallet = useSelector((state) => state.wallet);
  console.log("a wallet", wallet);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const address = useSelector((state) => state.wallet);

  const columns = [
    {
      title: "Asset Name",
      dataIndex: "titles",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.titles.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Views",
      dataIndex: "views",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.views === value;
      },
    },
    {
      title: "Likes",
      dataIndex: "likes",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.__v.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];

  async function getAssets() {
    if (wallet) {
      let id = wallet;

      await axios

        .post(`${API_URL}/nfts/getbyownernfts`, { id })
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

  useEffect(() => {
    getAssets();
  }, [address]);

  console.log("the assets", assets);
  const data = [];
  if (!loading) {
    assets.map((asset, index) => {
      data.push({
        key: index,
        name: (
          <>
            <div className="avatar-info">
              <Title level={5}>{asset.titles}</Title>
              <p></p>
            </div>
          </>
        ),
        function: (
          <>
            <div className="author-info">
              <Title level={5}>{asset.views}</Title>
            </div>
          </>
        ),
        status: (
          <>
            <div className="author-info">
              <Title level={5}>{asset ? asset.likes.length : "N/A"}</Title>
            </div>
          </>
        ),
      });
    });
  }

  
  if (address === null || address === undefined) {
  } else if (address === null || address === undefined) {
    return <div>Connect Wallet</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Engagements"
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={assets}
                    pagination={true}
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
}

export default Engagements;
