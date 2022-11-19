import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/public/messageBoard/list',
    controller.messageBoardController.list,
  );

  router.post(
    '/admin/messageBoard/create',
    controller.messageBoardController.create,
  );
  router.post(
    '/admin/messageBoard/update',
    controller.messageBoardController.update,
  );
  router.post(
    '/admin/messageBoard/delete',
    controller.messageBoardController.delete,
  );
};
