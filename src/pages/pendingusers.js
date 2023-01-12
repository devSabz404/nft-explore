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


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
function PendingUsers() {
    console.log('endpoint',API_ENDPOINT);

    const [pendingUsers, setPending] = useState([]);
    const [loading, setPendingUsersLoading] = useState(true);
    const [error, setError] = React.useState(false);
  
    console.log("from func", pendingUsers);
    async function getPendingUsers() {
      await axios
        .get(`${API_ENDPOINT}/api/pendingusers`)
        .then((res) => {
          //console.log("from func",res.data);
          setPending(res.data);
          setPendingUsersLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setPendingUsersLoading(false);
        });
    }
  
    useEffect(() => {
      getPendingUsers();
    }, []);
  
    async function handleApprove(ids) {
      const found = pendingUsers.find((Element) => Element._id === ids);
      let user_name = found.user_name;
      let email = found.email;
      let password = (Math.random() + 1).toString(36).substring(2);
      let role = found.role;
      let website = found.website;
      let phone = found.phone;
      let id = found._id;
      let message = `Your account has been approved. Your login details are:Email: ${email} Password: ${password}`;
      await axios
        .post(`${API_ENDPOINT}/auth/register`, {
          user_name,
          email,
          password,
          role,
          website,
          phone,
        })
        .then((res) => {
          console.log("user created",res.data);
          handleReject(id);
          sendEmail(email, message);
       
        })
        .catch((err) => {
          console.log("error", err);
        });
  
       
    }
    async function handleReject(id) {
      let ids = id;
      await axios
        .post(`${API_ENDPOINT}/api/deletepending`, { ids })
        .then((res) => {
          console.log("from func", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    async function sendEmail(mail,msg){
      await axios
        .post("./api/sendemail", { msg,mail })
        .then((res) => {
          console.log("from func", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

    
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
        title: 'Accept',
        dataIndex: 'accept',
        key: 'accept',
    },
    {
        title: 'Reject',
        dataIndex: 'reject',
        key: 'reject',
    }
  ];
  const dataSource = []
  if(pendingUsers.length > 0){
    pendingUsers.map((user)=>{
      dataSource.push({
        key: user._id,
        name: user.user_name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        accept: <Button type="primary" onClick={()=>handleApprove(user._id)}>Accept</Button>,
        reject: <Button type="danger" onClick={()=>handleReject(user._id)}>Reject</Button>
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
              title="Pending Users"
              extra={
                <>
                 
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

export default PendingUsers;
// /*!
// =========================================================
// * Muse Ant Design Dashboard - v1.0.0
// =========================================================
// * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
// * Coded by Creative Tim
// =========================================================
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */
// import React,{ useEffect,useState } from "react";
// import { Row, Col, Card, Radio, Table,Button } from "antd";
// import axios from "axios";
// import { useQuery } from "react-query";
// import InviteModal from "../components/invitemodal";


// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
// function PendingUsers() {


  
 
//     async function getPendingUsers() {
//       let res = await axios.get(`${API_ENDPOINT}/api/pendingusers`);
//       return res.data
//     }

    
//     const pendingUsersQuery = useQuery("pendingUsers", getPendingUsers);

      

   

    
// // table code start
// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//         title: 'Role',
//         dataIndex: 'role',
//         key: 'role',
//       },
//     {
//         title: 'Send Invite',
//         dataIndex: 'send',
//         key: 'send',
//     },
 
//   ];
//   const dataSource = []
//   if(pendingUsersQuery.status==="success"){
//     let info = pendingUsersQuery.data
//     info.map((user)=>{
//       dataSource.push({
//         key: user._id,
//         name: user.user_name,
//         phone: user.phone,
//         email: user.email,
//         role: user.role,
//         send: <Button type="primary" onClick={<InviteModal/>}>Invite</Button>,
       
//       })
//     }
//     )
//   }
  



//   const onChange = (e) => console.log(`radio checked:${e.target.value}`);

//   return (
//     <>
//       <div className="tabled">
//         <Row gutter={[24, 0]}>
//           <Col xs="24" xl={24}>
//             <Card
//               bordered={false}
//               className="criclebox tablespace mb-24"
//               title="Pending Users"
//               extra={
//                 <>
//                   <Radio.Group onChange={onChange} defaultValue="a">
//                     <Radio.Button value="a">All</Radio.Button>
//                     <Radio.Button value="b">ONLINE</Radio.Button>
//                   </Radio.Group>
//                 </>
//               }
//             >
//               <div className="table-responsive">
//                 <Table
//                   columns={columns}
//                   dataSource={dataSource}
//                   pagination={true}
//                   className="ant-border-space"
//                 />
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default PendingUsers;
