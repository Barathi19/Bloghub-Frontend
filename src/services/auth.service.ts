import axios from "axios";
import type {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from "../interface/auth.interface";
import { API_CONSTANT } from "../constant/api.contant";
import apiInstance from "../api";

export const Auth = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  const response = await axios.post(
    API_CONSTANT.baseURL + API_CONSTANT.login,
    payload
  );
  return response.data.data;
};

export const SignUp = async (payload: IRegisterPayload) => {
  await axios.post(API_CONSTANT.baseURL + API_CONSTANT.register, payload);
};

export const Logout = async () => {
  await apiInstance.post(API_CONSTANT.logout);
};
