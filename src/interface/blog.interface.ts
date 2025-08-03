export interface IBlog {
  _id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface IBlogForm {
  title: string;
  content: string;
}
