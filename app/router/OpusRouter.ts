import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/public/opus/opusList', controller.opusController.findOpusList);

  router.post('/admin/opus/createOpus', controller.opusController.createOpus);
  router.post('/admin/opus/updateOpus', controller.opusController.updateOpus);

  router.delete('/admin/opus/deleteOpus', controller.opusController.deleteOpus);
};
