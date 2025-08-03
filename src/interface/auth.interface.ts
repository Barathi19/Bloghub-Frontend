export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  firstName: string;
  lastName: string;
}

export interface IUser extends Omit<IRegisterPayload, "password"> {
  _id: string;
}

export interface IAuthResponse extends IUser {
  token: string;
}
