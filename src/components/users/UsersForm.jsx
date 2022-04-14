import React from "react";
import { Form, Input, Button, Select } from "antd";
import { layout, validateMessages } from "./UsersFormData";

const UsersForm = ({ getUser, modalValues, clearForm, submitLoading }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  console.log(modalValues);
  modalValues.name && form.setFieldsValue(modalValues);
  clearForm && form.resetFields();

  const onFinish = (values) => {
    getUser(values);
    form.resetFields();
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select placeholder="Select">
            <Option value="user">User</Option>
            <Option value="publisher">Publisher</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <div className="d-flex gap-3">
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UsersForm;
