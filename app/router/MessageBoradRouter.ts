import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/public/messageBoard/list',
    controller.messageBoardController.list,
  );
  router.post('/messageBoard/create', controller.messageBoardController.create);
};
