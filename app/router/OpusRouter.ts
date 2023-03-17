import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { opusController },
    router,
  } = app;

  router.get('/public/opus/opusList', opusController.findOpusList);

  router.post('/admin/opus/createOpus', opusController.createOpus);
  router.post('/admin/opus/updateOpus', opusController.updateOpus);

  router.post('/admin/opus/setOpusStar', opusController.setOpusStar);
  router.post('/admin/opus/setManyOpusStar', opusController.setManyOpusStar);

  router.post('/admin/opus/setOpusLike', opusController.setOpusLike);
  router.post('/admin/opus/setManyOpusLike', opusController.setManyOpusLike);

  router.post('/admin/opus/addOpusMessage', opusController.addOpusMessage);
  router.post(
    '/admin/opus/updateOpusMessage',
    opusController.updateOpusMessage,
  );
  router.delete(
    '/admin/opus/deleteOpusMessage',
    opusController.deleteOpusMessage,
  );
  router.post(
    '/admin/opus/setManyOpusMessage',
    opusController.setManyOpusMessage,
  );

  router.delete('/admin/opus/deleteOpus', opusController.deleteOpus);
};
