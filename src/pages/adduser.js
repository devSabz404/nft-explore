import { Button, Form, Input, InputNumber,Alert } from 'antd';
import axios from "axios";
import React,{useState} from 'react';
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};
const Alerts = () => <Alert message="Success " type="success" />;
const AlertF = () => <Alert message="Failed" type="erro" />;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const AddUser = () => {
  const onFinish = (values) => {
    console.log(values);}
    const [formInput,setFormInput] = useState({
        first_name:"",
        last_name:"",
        role:"3",
        email:"",
        password:""

    });
    const [success,setSuccess]= useState(false)
    const [fail,setFail]= useState(false)

    async function createUsers(){
        const {first_name,last_name,role,email,password} = formInput
        await axios.post(`${API_ENDPOINT}/auth/register`,{first_name,last_name,role,email,password})
        .then((res)=>{
        setSuccess(true);
        setTimeout(()=>{
        window.location.assign('/')
        },3000)
       
        })
        .catch((error)=>{
            setFail(false);
           
           
        })

    }
  


  return (
    <>
    {success?<Alerts/>:null}
    {fail?<AlertF/>:null}
    
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
        onChange={(e) => {
            setFormInput({ ...formInput, first_name: e.target.value });
          }}
      >
        <Input />
      </Form.Item>
      <Form.Item
       
        label="Last Name"
        rules={[
          {
            required: true,
          },
        ]}
        onChange={(e) => {
            setFormInput({ ...formInput, last_name: e.target.value });
          }}
      >
        <Input />
      </Form.Item>
      <Form.Item
      
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
        onChange={(e) => {
            setFormInput({ ...formInput, email: e.target.value });
          }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
        onChange={(e) => {
            setFormInput({ ...formInput, password: e.target.value });
          }}
      >
        <Input />
      </Form.Item>

      
    
      
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={createUsers}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default AddUser;