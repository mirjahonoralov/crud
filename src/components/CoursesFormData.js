import uuid from "react-uuid";

export const columns = [
  {
    title: "MinimumSkill",
    dataIndex: "minimumSkill",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Tuition",
    dataIndex: "tuition",
  },
  {
    title: "weeks",
    dataIndex: "weeks",
  },
];
export const data = [
  {
    key: "1",
    name: "John Brown",
    email: "john@gmail.com",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "jim@gmail.com",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "joe@gmail.com",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    email: "diabled@gmail.com",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
];

export const defaultModalValues = {
  key: uuid(),
  name: "",
  age: 0,
  address: "",
  email: "",
};

export const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

export const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
