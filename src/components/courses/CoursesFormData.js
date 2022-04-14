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
