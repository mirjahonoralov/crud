import { Button, Form, Input, Radio, Select } from "antd";
import React from "react";
import { CAREERS } from "../../const";
import { layout } from "./StudentsData";

const StudentsForm = ({ handleOk, defaultValues }) => {
  const [form] = Form.useForm();

  defaultValues && form.setFieldsValue(defaultValues);

  const onFinish = (values) => {
    handleOk(values);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="student"
      onFinish={onFinish}
      initialValues={{ jobGuarantee: false }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="slug"
        label="Slug"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="careers"
        label="Careers"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select careers"
        >
          {CAREERS.map((career, id) => (
            <Select.Option key={id} value={career}>
              {career}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="user"
        label="User"
        rules={[{ required: false, message: "Not filled" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="jobGuarantee" label="Job Guarantee">
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default StudentsForm;
