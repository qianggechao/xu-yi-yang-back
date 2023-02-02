import { StageTypeEnum } from '../typings/stage';
import BaseController from './baseController';

const stageValidate = (action: 'update' | 'create' = 'create') => {
  const required = action === 'create';

  return {
    name: { type: 'string', required },
    type: {
      type: 'enum',
      values: Object.keys(StageTypeEnum),
      required,
    },
    cover: { type: 'string', required },
    url: { type: 'string', required: false },
    link: { type: 'string', required: false },
    description: { type: 'string', required: false },
  };
};

export default class StageController extends BaseController {
  async findStageList() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const filter = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.stageService.findList(filter, page)),
    };
  }

  async createStage() {
    const { ctx, service } = this;

    ctx.validate(stageValidate(), ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.stageService.create(ctx.request.body),
    };
  }

  async updateStage() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', require: true },
        ...stageValidate('update'),
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.stageService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async deleteStage() {
    const { ctx, service } = this;

    ctx.validate({ id: { type: 'string', required: true } }, ctx.request.query);

    ctx.body = {
      success: true,
      data: await service.stageService.delete(ctx.request.query.id),
    };
  }
}
