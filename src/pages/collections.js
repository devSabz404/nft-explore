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
import React,{ useEffect,useState } from "react";
import { Row, Col, Card, Radio, Table,Button , Avatar,
    Typography,} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { ImportOutlined } from "@ant-design/icons";


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function Collections() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = React.useState(false);
  
    console.log("from func", users);

 
    async function getPendingUsers() {
      await axios
        .get(`${API_ENDPOINT}/collection/getcollections`)
        .then((res) => {
          console.log("from func",res.data);
          setUsers(res.data);
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

    
// table code start
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'phone',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'View',
        dataIndex: 'view',
        key: 'view',
      },

  ];
  const dataSource = []
  if(users.length > 0){
    users.map((user)=>{
      dataSource.push({
        key: user._id,
        name: (
            <>
              <Avatar.Group>
                <Avatar
                  className="shape-avatar"
                  shape="square"
                  size={40}
                  src={user.banner}
                ></Avatar>
               
              </Avatar.Group>{" "}
            </>
          ),
        collection: user.name,
        creator: user.creator,
        category: user.category,
        view: <Link to={`/collection/${user._id}`}>View</Link>,
    
      
      })
    }
    )
  }
  



  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Collections"
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
                  dataSource={dataSource}
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

export default Collections;
