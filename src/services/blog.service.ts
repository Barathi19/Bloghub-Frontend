import apiInstance from "../api";
import { API_CONSTANT } from "../constant/api.contant";
import type { IBlogForm } from "../interface/blog.interface";

export const GetAllBlogs = async () => {
  const response = await apiInstance.get(API_CONSTANT.blog);
  return response.data.data;
};

export const CreateBlog = async (payload: IBlogForm) => {
  await apiInstance.post(API_CONSTANT.blog, payload);
};

export const UpdateBlog = async (payload: IBlogForm, id: string) => {
  await apiInstance.put(`${API_CONSTANT.blog}/${id}`, payload);
};

export const DeleteBlog = async (id: string) => {
  await apiInstance.delete(`${API_CONSTANT.blog}/${id}`);
};
