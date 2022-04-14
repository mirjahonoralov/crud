import React from "react";
import { Form, Input, Button } from "antd";
import { layout, validateMessages } from "./CoursesFormData";

const GroupForm = ({ getUser, modalValues, clearForm, sendLoading }) => {
  const [form] = Form.useForm();
  modalValues && form.setFieldsValue(modalValues);
  !modalValues.name && clearForm && form.resetFields();

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
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tuition"
          label="Tuition"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="weeks"
          label="Weeks"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="minimumSkill"
          label="MinimumSkill"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <div className="d-flex gap-3">
            <Button type="primary" htmlType="submit" loading={sendLoading}>
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
