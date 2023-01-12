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
import { Row, Col, Card, Radio, Table,Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { ImportOutlined,CarryOutOutlined,ExpandAltOutlined  } from "@ant-design/icons";
import InviteModal from "../components/invitemodal";


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function AllUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = React.useState(false);
  
    console.log("from func", users);

 
    async function getPendingUsers() {
      await axios
        .get(`${API_ENDPOINT}/auth/getusers`)
        .then((res) => {
          //console.log("from func",res.data);
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Date Registered',
        dataIndex: 'registered',
        key: 'registered',
      },
      {
        title: 'View',
        dataIndex: 'view',
        key: 'view',
      },
      {
        title: 'Agreement',
        dataIndex: 'agreement',
        key: 'agreement',
      },
     

  ];
  const dataSource = []
  if(users.length > 0){
    users.map((user)=>{
      dataSource.push({
        key: user._id,
        name: user.user_name,
        phone: user.phone,
        email: user.email,
        role: user.role==='1'?"Creator":"Agency",
        registered:user?.agreement_date,
        view: <Link to={`/userprofile/${user._id}`}><ExpandAltOutlined /></Link>,
        agreement: <Link to={`/agreement/${user._id}`}><CarryOutOutlined /></Link>
    
      
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
              title="All Users"
              extra={
                <div>
                <div>
                 <InviteModal/>
                </div>
                  <div>
                
                 </div>
                 </div>
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

export default AllUsers;
