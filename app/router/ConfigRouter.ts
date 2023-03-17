import { Application } from 'egg';

export default (app: Application) => {
  const {
    controller: { configController },
    router,
  } = app;

  router.get('/public/config/configList', configController.configList);
  router.get(
    '/public/config/findByConfigTitle',
    configController.findByConfigTitle,
  );
  router.post('/admin/config/createConfig', configController.createConfig);
  router.post('/admin/config/updateConfig', configController.updateConfig);
  router.delete('/admin/config/deleteConfig', configController.deleteConfig);
};
