import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { userController } = controller;

  router.post('/public/userInfo', userController.userInfo);

  router.post('/public/loginUser', userController.loginUser);

  router.post('/public/userList', userController.userList);

  router.post('/public/createUser', userController.createUser);
};
