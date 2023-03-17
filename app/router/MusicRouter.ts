import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { musicController },
    router,
  } = app;

  router.get('/public/music/musicList', musicController.musicList);

  router.post('/admin/music/createMusic', musicController.createMusic);
  router.post('/admin/music/updateMusic', musicController.updateMusic);
  router.delete('/admin/music/deleteMusic', musicController.deleteMusic);

  router.post(
    '/admin/music/addMusicChildren',
    musicController.addMusicChildren,
  );
  router.post(
    '/admin/music/updateMusicChildren',
    musicController.updateMusicChildren,
  );
  router.delete(
    '/admin/music/deleteMusicChildren',
    musicController.deleteMusicChildren,
  );

  router.post('/admin/music/setMusicLike', musicController.setMusicLike);
  router.post(
    '/admin/music/setManyMusicLike',
    musicController.setManyMusicLike,
  );

  router.post('/admin/music/addMusicMessage', musicController.addMusicMessage);
  router.post(
    '/admin/music/updateMusicMessage',
    musicController.updateMusicMessage,
  );
  router.post(
    '/admin/music/setManyMusicMessage',
    musicController.setManyMusicMessage,
  );
  router.delete(
    '/admin/music/deleteMusicMessage',
    musicController.deleteMusicMessage,
  );

  router.post('/admin/music/setMusicStar', musicController.setMusicStar);
  router.post(
    '/admin/music/setManyMusicStar',
    musicController.setManyMusicStar,
  );
};
