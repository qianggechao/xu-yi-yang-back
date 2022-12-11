import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get(
    '/public/article/articleList',
    controller.articleController.articleList,
  );

  router.get(
    '/public/article/findArticleTitle',
    controller.articleController.findArticleTitle,
  );

  router.post(
    '/admin/article/createArticle',
    controller.articleController.createArticle,
  );

  router.post(
    '/admin/article/updateArticle',
    controller.articleController.updateArticle,
  );

  router.delete(
    '/admin/article/deleteArticle',
    controller.articleController.deleteArticle,
  );
};
