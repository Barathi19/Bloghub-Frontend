import axios from "axios";
import type {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from "../interface/auth.interface";
import { API_CONSTANT } from "../constant/api.contant";

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
