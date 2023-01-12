import { Button, Checkbox, Form, Input } from 'antd';
import React,{useRef} from 'react';
import emailjs from "@emailjs/browser";

const FormInvite = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.send('service_e9viaip','template_vjij8up', form.current,'qWuBhK6t_0nqhQSKk')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
    

  return (
    <Form
        ref={form}
        onSubmit={sendEmail}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
  
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      hidden={true}
        label="message"
        name="message"
        value={"Your invite toNFT exploerey"}
      
      >
      
      </Form.Item>

    

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormInvite;