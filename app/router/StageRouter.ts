import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/public/stage/stageList',
    controller.stageController.findStageList,
  );

  router.post(
    '/admin/stage/createStage',
    controller.stageController.createStage,
  );
  router.post(
    '/admin/stage/updateStage',
    controller.stageController.updateStage,
  );

  router.delete(
    '/admin/stage/deleteStage',
    controller.stageController.deleteStage,
  );
};
