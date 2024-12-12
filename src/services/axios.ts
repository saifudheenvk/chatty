import axios from "axios";

export const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}/api/v1`;
export const APP_ENVIRONMENT: 'local' | 'development' | 'staging' | 'production' = 'development';



const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
