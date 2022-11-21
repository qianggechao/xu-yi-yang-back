import {
  messageBoardTagEnum,
  messageBoardTypeEnum,
} from '../enum/messageBoard';
import BaseController from './baseController';

export default class MessageBoardModelController extends BaseController {
  async list() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.messageBoardService.findList(query, page)),
    };
  }

  async create() {
    const { ctx, service } = this;

    ctx.validate(
      {
        userId: { type: 'string', required: true },
        content: { type: 'string', required: true },
        type: { type: 'enum', values: messageBoardTypeEnum, required: true },
        tag: { type: 'enum', values: messageBoardTagEnum, required: false },
        likes: { type: 'integer', required: false },
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      ...(await service.messageBoardService.create(ctx.request.body)),
    };
  }

  async update() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', required: true },
        content: { type: 'string', required: true },
        type: { type: 'enum', values: messageBoardTypeEnum, required: true },
        tag: { type: 'enum', values: messageBoardTagEnum, required: false },
        likes: { type: 'integer', required: false },
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.messageBoardService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async delete() {
    const { ctx, service } = this;

    ctx.validate({ id: 'string' }, ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.messageBoardService.delete(ctx.request.body.id),
    };
  }
}
