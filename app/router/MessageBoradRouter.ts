import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('messageBoard/list', controller.messageBoardController.findLlist);
  router.get('messageBoard/create', controller.messageBoardController.create);
};
