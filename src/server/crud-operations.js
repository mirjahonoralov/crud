import axios from "axios";
import { API_URL, TOKEN } from "../const";

const axiosFunc = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
  headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
});

export const getData = (url) => {
  const config = {
    method: "GET",
    url,
  };
  return axiosFunc(config);
};

export const postData = (url, data) => {
  const config = {
    method: "POST",
    url,
    data,
  };
  return axiosFunc(config);
};

export const updateData = (url, data) => {
  const config = {
    method: "PUT",
    url,
    data,
  };
  return axiosFunc(config);
};

export const deleteData = (url) => {
  const config = {
    method: "DELETE",
    url,
  };
  return axiosFunc(config);
};
