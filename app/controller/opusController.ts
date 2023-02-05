import { OpusTypeEnum } from '../typings/opus';
import BaseController from './baseController';

const opusValidate = (action: 'update' | 'create' = 'create') => {
  const required = action === 'create';

  return {
    name: { type: 'string', required },
    type: {
      type: 'enum',
      values: Object.keys(OpusTypeEnum),
      required,
    },
    cover: { type: 'string', required },
    url: { type: 'string', required: false },
    link: { type: 'string', required: false },
    description: { type: 'string', required: false },
  };
};

export default class OpusController extends BaseController {
  async findOpusList() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const filter = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.opusService.findList(filter, page)),
    };
  }

  async createOpus() {
    const { ctx, service } = this;

    ctx.validate(opusValidate(), ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.opusService.create(ctx.request.body),
    };
  }

  async updateOpus() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', require: true },
        ...opusValidate('update'),
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async deleteOpus() {
    const { ctx, service } = this;

    ctx.validate({ id: { type: 'string', required: true } }, ctx.request.query);

    ctx.body = {
      success: true,
      data: await service.opusService.delete(ctx.request.query.id),
    };
  }
}
