import axios from "axios";
import { API_URL, TOKEN } from "../const";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
});

export const httpRequest = (config) => {
  console.log(config);
  return axiosInstance(config);
};
