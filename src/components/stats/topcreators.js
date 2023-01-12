import { useState,useEffect } from "react";
import axios from "axios"
import { Space, Table, Tag } from 'antd';
import { ethers } from "ethers";
import { CSVLink } from "react-csv";
const API_URL = process.env.REACT_APP_API_ENDPOINT;
const columns = [
  {
    title: 'Address',
    dataIndex: 'myAddress',
    key: 'myAddress',

  },
  {
    title: 'Value',
    dataIndex: 'myValue',
    key: 'myValue',
  },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },

//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function TopFive (){
    const [top,setTop] =useState();

    

    async function getTop(){
        await axios.post(`${API_URL}/stats/transfers1`)
        .then((res)=>{
            console.log("this is top 5",res.data);
            setTop(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
useEffect(()=>{
    getTop();
},[])

const mydata =[]
if(top){
   for(let i =0 ;i<top.length;i++){
    
        //top[i].value = parseInt(top[i].value);

        mydata.push({
            myAddress:top[i].to_address,
            myValue:ethers.utils.formatEther(top[i].value)
        })
    
   }
}

   console.log("this is formatted",mydata)

return <Table columns={columns} dataSource={mydata} />;

} 
export default TopFive;