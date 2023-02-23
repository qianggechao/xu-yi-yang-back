import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { userController } = controller;

  // 以 非 /public/ 访问的接口都是需要 校验 token 的
  router.post('/public/loginUser', userController.loginUser);
  router.post('/public/createUser', userController.createUser);

  router.post(
    '/public/user/sendUpdatePasswordEmailCaptcha',
    userController.sendUpdatePasswordEmailCaptcha,
  );
  router.post('/public/user/userInfo', userController.userInfo);

  router.post('/public/user/createAdmin', userController.createAdmin);
  // router.post('/public/user/deleteMany', userController.deleteMany);

  router.get('/public/user/userList', userController.userList);
  router.get('/public/user/userSearch', userController.userSearch);

  router.get(
    '/public/user/getRegisterCaptcha',
    userController.getRegisterCaptcha,
  );
  router.get(
    '/public/user/getUpdatePasswordCaptcha',
    userController.getUpdatePasswordCaptcha,
  );

  router.delete('/admin/user/deleteUser', userController.delete);
  router.post('/admin/user/updateUser', userController.update);
};
