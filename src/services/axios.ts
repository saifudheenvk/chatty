import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
