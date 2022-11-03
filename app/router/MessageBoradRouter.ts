import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    'public/messageBoard/list',
    controller.messageBoardController.findLlist,
  );
  router.post(
    'public/messageBoard/create',
    controller.messageBoardController.create,
  );
};
