import apiInstance from "../api";
import { API_CONSTANT } from "../constant/api.contant";
import type { IUserInfo } from "../interface/user.interface";

export const GetUserDetail = async (): Promise<IUserInfo> => {
  const response = await apiInstance.get(API_CONSTANT.user);
  return response.data.data[0];
};
