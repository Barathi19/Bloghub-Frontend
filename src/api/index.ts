import axios from "axios";
import { API_CONSTANT } from "../constant/api.contant";
import { LOCAL_CONSTANT } from "../constant/app.constant";

const apiInstance = axios.create({ baseURL: API_CONSTANT.baseURL });

const getToken = () => localStorage.getItem(LOCAL_CONSTANT.token);

apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;
