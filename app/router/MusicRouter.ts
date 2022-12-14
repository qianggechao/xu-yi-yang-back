import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/public/music/musicList', controller.musicController.musicList);

  router.post(
    '/admin/music/createMusic',
    controller.musicController.createMusic,
  );
  router.post(
    '/admin/music/updateMusic',
    controller.musicController.updateMusic,
  );
  router.delete(
    '/admin/music/deleteMusic',
    controller.musicController.deleteMusic,
  );
};
