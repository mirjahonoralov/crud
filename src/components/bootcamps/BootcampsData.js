import { useSelector } from "react-redux";

// const lan = useSelector((state) => state.languageReducer);
export const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Website",
    dataIndex: "website",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Careers",
    dataIndex: "careers",
  },
  {
    title: "Adress",
    dataIndex: "location",
    render: (location) => location.city,
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
