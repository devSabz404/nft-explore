import axios from "axios"

import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Input,
  notification,
  Row,
  Select


} from 'antd';
import React, { useState } from 'react';

const formItemLayout = {

  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 17,
  },
};
const { TextArea } = Input;
const {Option} = Select;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const openNotification = () => {
  notification.open({
    message: 'Success',
    description:
      'User agreement sent',
    className: 'custom-class',
    style: {
      width: 600,
    },
  });
};

const Invite = () => {

  const [formInput,setFormInput] = useState({
    deliverables:"",
    revenueshare:null,
    waiver:null,
    email:"",
    role:""


  })



  const handleSend = async (e) =>{
    e.preventDefault()
    const {deliverables,revenueshare,waiver,email,role}= formInput
  
   
    await axios.post(`${API_ENDPOINT}/userinvite/invite`,{deliverables,revenueshare,waiver,email,role})
    .then(()=>{
      openNotification()
   
  })
  .catch((err)=>{
    alert("Something went wrong")
  })
      
    

   
  }

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
 
   
    >
      <Form.Item >
        <span className="ant-form-text">User service Agreement</span>
      </Form.Item>
      <Form.Item
        name="select"
        label={`Deliverables & Fees`}
      
        
      >
            <TextArea
             rows={4} 
            
         
             onChange={(e) =>
              setFormInput({ ...formInput, deliverables: e.target.value })
            }
             />

        
       
      </Form.Item>

      

      <Form.Item label="Revenue share">
        <Form.Item name="input-number" noStyle>
          <InputNumber
           min={1}
           max={10}
           value={5}

          
           placeholder="5"
           onChange={(value) =>
            setFormInput({ ...formInput, revenueshare:value})
          }

             />
        </Form.Item>
        <span className="ant-form-text"> %</span>
      </Form.Item>


      

   

    

      <Form.Item name="checkbox-group" label="VIP fee waiver">
    
          <Row>
            <Col span={8}>
            <Checkbox 
            onChange={(e) => setFormInput({...formInput, waiver:e.target.checked})}
            
            >
              </Checkbox>
              
             
            </Col>
            
         
           
          </Row>
      
      </Form.Item>
      <Form.Item 
      name="user_email" 
      label="Email" 
      rules={[{ required: true }]}
      onChange={(e) =>
        setFormInput({ ...formInput, email: e.target.value })
      }
      >
        <Input />
      </Form.Item>

      <Form.Item label="Role">
      <Select
      placeholder="Role"
      style={{
        width: 120,
      }}
      onChange={(e) =>
        setFormInput({ ...formInput, role: e.target.value })
      }
     
      >
      <Option value="1">Creator</Option>
      <Option value="2">Agency</Option>
      </Select>
    
       
      </Form.Item>

   

     


      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button 
        type="primary" 
        value="Send"
        htmlType="submit"
        onClick={handleSend}>
        Generate Service Agreement       
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Invite;