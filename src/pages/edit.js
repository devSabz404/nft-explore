import React, { useState } from 'react';

import { create  } from "ipfs-http-client";
import axios from 'axios';
import {
  Form,
  Input,
  Button,

  DatePicker,
 
} from 'antd';

import { useSelector } from 'react-redux';


const { TextArea } = Input;
const projectId = process.env.REACT_APP_PROJECT_ID_INFURA
const projectSecret = process.env.REACT_APP_KEY_SECRET
const projectIdAndSecret = `${projectId}:${projectSecret}`
const API_URL = process.env.REACT_APP_API_ENDPOINT

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: "Basic " + Buffer.from(projectIdAndSecret).toString("base64") 
  } });

const EditForm = () => {
    const userid = useSelector(state=>state.user._id)
    const [fileUrl, setFileUrl] = useState(null);
    const [bio,setBio] = useState(null);
    const [name,setName] = useState(null);


    async function onChange(e) {
        const file = e.target.files[0];
        try {
          const added = await client.add(file, {
            progress: (prog) => console.log(`received: ${prog}`),
          });
          const url = `https://vaultindustria.infura-ipfs.io/ipfs/${added.path}`;
          setFileUrl(url);
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      }


      async function handleSubmit(e){
        e.preventDefault();
        let user_name = name;
        let photo = fileUrl;
        let id = userid;
        await axios.post(`${API_URL}/auth/updateuser`, {user_name,photo,bio,id},
        {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data);
            window.location.href="/myprofile";
        })
        .catch((error) => {
            console.log(error);
        });
    }


  return (
    <>
      
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        
      >
       
        
        
        <Form.Item label="User Name">
        <Input onChange={e=>{setName(e.target.value)}} />
        </Form.Item>
     
        {/* <Form.Item label="Phone">
          <InputNumber />
        </Form.Item> */}
        <Form.Item label="Bio">
          <TextArea onChange={e=>{setBio(e.target.value)}} rows={4} />
        </Form.Item>
      
        <Form.Item label="Upload" valuePropName="fileList">
          <input type="file" onChange={onChange} />
        </Form.Item>
        <Form.Item label="Button">
          <Button onClick={(e)=>{handleSubmit(e)}}>Update</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditForm;