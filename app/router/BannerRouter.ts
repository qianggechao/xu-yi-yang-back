import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/public/banner/list', controller.bannerController.list);

  router.post('/banner/create', controller.bannerController.create);
};
