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

  router.post(
    '/admin/music/addMusicChildren',
    controller.musicController.addMusicChildren,
  );
  router.post(
    '/admin/music/updateMusicChildren',
    controller.musicController.updateMusicChildren,
  );
  router.post(
    '/admin/music/setMusicLike',
    controller.musicController.setMusicLike,
  );

  router.delete(
    '/admin/music/deleteMusic',
    controller.musicController.deleteMusic,
  );
};
