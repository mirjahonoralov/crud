import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { layout, validateMessages } from "./GroupFormData";
import uuid from "react-uuid";

const GroupForm = ({ getUser, modalValues, editUser, clearForm }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(modalValues);
  !modalValues.name && clearForm && form.resetFields();

  const onFinish = (values) => {
    modalValues.name
      ? editUser(modalValues, { ...values, key: uuid() })
      : getUser(values);
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
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="address" label="address">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <div className="d-flex gap-3">
            <Button type="primary" htmlType="submit">
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

export default GroupForm;
