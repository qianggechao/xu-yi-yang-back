import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { userController } = controller;

  router.post('/public/userInfo', userController.userInfo);

  // 以 非 /public/ 访问的接口都是需要 校验 token 的
  router.post('/user/userInfo', userController.userInfo);

  router.post('/public/loginUser', userController.loginUser);

  router.post('/public/userList', userController.userList);

  router.post('/public/createUser', userController.createUser);
};
