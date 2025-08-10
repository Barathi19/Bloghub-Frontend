import axios, { AxiosError } from "axios";
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

apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // REDIRE TO LOGIN
    if (error.status === 401 || error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
