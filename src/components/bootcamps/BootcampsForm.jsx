import React from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { CAREERS } from "../../const";
import { layout } from "./BootcampsData";
import { useSelector } from "react-redux";

const BootcampsForm = ({ handleOk, modalValues, sendLoading, clearForm }) => {
  const [form] = Form.useForm();
  modalValues.name && form.setFieldsValue(modalValues);
  clearForm && form.resetFields();

  const onFinish = (values) => {
    handleOk(values);
    form.resetFields();
  };

  const theme = useSelector((state) => state.themeReducer);
  console.log(theme);

  return (
    <Form
      {...layout}
      form={form}
      name="bootcamp"
      onFinish={onFinish}
      initialValues={{ jobGuarantee: false }}
      // style={{ background: theme.bgColor, color: theme.textColor }}
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
        name="website"
        label="Website"
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
      <Button type="primary" htmlType="submit" sendLoading={sendLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default BootcampsForm;
