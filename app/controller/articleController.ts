import { ArticleTypeEnum } from '../typings/Article';
import BaseController from './baseController';

const articleValidate = (action: 'update' | 'create' = 'create') => {
  const required = action === 'create';

  return {
    type: {
      type: 'enum',
      values: Object.keys(ArticleTypeEnum),
      required,
    },
    title: { type: 'string', required },
    content: { type: 'string', required },
    description: { type: 'string', required: false },
    cover: { type: 'string', required: false },
  };
};

export default class ArticleController extends BaseController {
  async articleList() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.articleService.findList(query, page)),
    };
  }

  async findArticleTitle() {
    const { ctx, service } = this;

    ctx.validate(
      {
        title: 'string',
      },
      ctx.request.query,
    );

    ctx.body = {
      success: true,
      data: await service.articleService.findByTitle(ctx.request.query.title),
    };
  }

  async createArticle() {
    const { ctx, service } = this;

    ctx.validate(articleValidate(), ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.articleService.create(ctx.request.body),
    };
  }

  async updateArticle() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', required: true },
        ...articleValidate('update'),
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.articleService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async deleteArticle() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', required: true },
      },
      ctx.request.query,
    );

    ctx.body = {
      success: true,
      data: await service.articleService.delete(ctx.request.query.id),
    };
  }
}
