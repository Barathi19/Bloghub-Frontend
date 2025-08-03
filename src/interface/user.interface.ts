import type { IUser } from "./auth.interface";
import type { IBlog } from "./blog.interface";

export interface IUserInfo extends IUser {
  blogs: IBlog[];
}
