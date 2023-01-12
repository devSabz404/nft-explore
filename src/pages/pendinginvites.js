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
import { useQuery } from "react-query";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_ENDPOINT;
function PendingInvites() {

    const getPending = async () =>{
   
        let res = await axios.get(`${API_URL}/userinvite/pending`)
        return res.data
    }

    const pendingQuery = useQuery("pending", getPending);


const columns = [
    {
      title: 'Date of Invite',
      dataIndex: 'date',
      key: 'date',
    },
   
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
 
  ];
  const dataSource = pendingQuery.data

  




  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Pending Invites"
            
            >
              <div className="table-responsive">
              {pendingQuery.status === "error" && <p>Error Fetching data</p>}
  {pendingQuery.status === "loading" && <p>Fetching data...</p>}
  {pendingQuery.status === "success" && 
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={true}
                  className="ant-border-space"
                />}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PendingInvites;
