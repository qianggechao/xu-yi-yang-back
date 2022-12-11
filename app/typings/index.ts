// 放全局的类型

export type ResponseBase<T = any> = {
  data: T;
  msg: string;
  success: boolean;
  error: Record<string, any>;
};

export type Page = {
  currentPage: number;
  pageSize: number;
};

export type BaseDocument = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
