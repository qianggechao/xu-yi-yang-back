export type UserType = {
  _id: string;
  nickName: string;
  email: string;
  password: string;
  // 头像
  avator: string;
  // 个性签名
  brief: string;
  type: 'admin' | 'user' | 'superAdmin';
};
