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
  router.post(
    '/admin/music/addMusicMessage',
    controller.musicController.addMusicMessage,
  );
  router.post(
    '/admin/music/updateMusicMessage',
    controller.musicController.updateMusicMessage,
  );
  router.post(
    '/admin/music/setMusicStart',
    controller.musicController.setMusicStart,
  );

  router.delete(
    '/admin/music/deleteMusic',
    controller.musicController.deleteMusic,
  );
  router.delete(
    '/admin/music/deleteMusicMessage',
    controller.musicController.deleteMusicMessage,
  );
  router.delete(
    '/admin/music/deleteMusicChildren',
    controller.musicController.deleteMusicChildren,
  );
};
