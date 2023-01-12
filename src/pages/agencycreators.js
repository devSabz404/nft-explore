

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
import axios from "axios";
import ModalInvite from "../components/modal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export default function AgencyCreators() {

  const agencyId = useSelector(state=>state.user._id)
    const[creators,setCreators]=useState([]);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    async function getCreators(){
        await axios.post(`${API_ENDPOINT}/auth/getcreators`,{agencyId})
        .then((res)=>{
            setCreators(res.data);
            setLoading(false);

        })
        .catch((error)=>{
            console.log(error)
            setError("Something Went Wrong")

        })

    }
    console.log("creators",creators)
   useEffect(()=>getCreators(),[])
// table code start
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Collections',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Assets',
        dataIndex: 'role',
        key: 'role',
      },
    {
        title: 'View',
        dataIndex: 'accept',
        key: 'accept',
    },
  
  ];

  const dataSource = []
  if(creators.length > 0){
    creators.map((user)=>{
      dataSource.push({
        key: user._id,
        name: user.user_name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        accept: <Button type="primary" ><Link to={`creatoraccount/${user._id}`} >View</Link></Button>,
       
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
              title="Creators"
              extra={
                <div>
                <div>
                 <ModalInvite/>
                </div>
                  <div>
                  <Button><Link to="./createuser">Add Creator</Link></Button>
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




