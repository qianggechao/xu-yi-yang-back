import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get(
    '/public/banner/bannerList',
    controller.bannerController.bannerList,
  );

  router.post(
    '/admin/banner/createBanner',
    controller.bannerController.createBanner,
  );

  router.post(
    '/admin/banner/updateBanner',
    controller.bannerController.updateBanner,
  );

  router.delete(
    '/admin/banner/deleteBanner',
    controller.bannerController.deleteBanner,
  );
};
