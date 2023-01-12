import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatorForm = () => {
  const agency = useSelector((state) => state.user._id);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
 
  const [formInput, updateFormInput] = useState({
    user_name: "",
    email: "",
    phone: "",
    password: "",
    role: "1",
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function handleSubmit(e) {
    const { user_name, email, phone, password, role, description } = formInput;

    let data = { user_name, email, phone, password, role, description, agency };

    await axios
      .post(`${API_ENDPOINT}/auth/register`, data)
      .then((res) => {
        console.log(res.data);
        alert("Share credentials with the creator");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Creator Name"
        name="user_name"
        onChange={(e) =>
          updateFormInput({ ...formInput, user_name: e.target.value })
        }
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Creator Email"
        name="email"
        onChange={(e) =>
          updateFormInput({ ...formInput, email: e.target.value })
        }
        rules={[
          {
            required: true,
            message: "Please input cretor email!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Creator Phone"
        name="phone"
        onChange={(e) =>
          updateFormInput({ ...formInput, phone: e.target.value })
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        onChange={(e) =>
          updateFormInput({ ...formInput, password: e.target.value })
        }
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatorForm;
