// 放全局的类型

export type ResponseBase<T = any> = {
  data: T;
  msg: string;
  success: boolean;
  error: Object;
};

export type Page = {
  currentPage: number;
  pageSize: number;
};
