import BaseController from './baseController';

const configValidate = (action: 'create' | 'update' = 'create') => {
  const required = action === 'create';

  return {
    title: { type: 'string', required },
    description: { type: 'string', required: false },
    content: { type: 'string', required: false },
    author: { type: 'string', required: false },
    copyright: { type: 'string', required: false },
    links: { type: 'array', required: false },
  };
};

export default class ConfigController extends BaseController {
  async configList() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.configService.findList(query, page)),
    };
  }

  async createConfig() {
    const { ctx, service } = this;
    const { body } = ctx.request;

    ctx.validate(configValidate(), body);

    ctx.body = {
      success: true,
      data: await service.configService.create(body),
    };
  }

  async findByConfigTitle() {
    const { ctx, service } = this;
    const { query } = ctx.request;

    ctx.validate({ title: { type: 'string', required: true } }, query);

    ctx.body = {
      success: true,
      data: await service.configService.findByTitle(query.title),
    };
  }

  async updateConfig() {
    const { ctx, service } = this;
    const { body } = ctx.request;

    ctx.validate(configValidate('update'), body);

    ctx.body = {
      success: true,
      data: await service.configService.update(body.id, body),
    };
  }

  async deleteConfig() {
    const { ctx, service } = this;
    const { query } = ctx.request;

    ctx.validate({ id: { type: 'string', required: true } }, query);

    ctx.body = {
      success: true,
      data: await service.configService.delete(query.id),
    };
  }
}
