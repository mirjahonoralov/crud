import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URL, TOKEN } from "../const";
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post(API_URL + "auth/login", values)
      .then((res) => {
        localStorage.setItem(TOKEN, res.data.token);
        window.location.href = "/";
      })
      .catch((err) => message.error("email or password is incorrect"));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
