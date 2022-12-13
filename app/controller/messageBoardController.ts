import {
  messageBoardTagEnum,
  messageBoardTypeEnum,
} from '../typings/messageBoard';
import BaseController from './baseController';

const messageBoardValidate = (action: 'create' | 'update' = 'create') => {
  const required = action === 'create';

  return {
    userId: { type: 'string', required },
    content: { type: 'string', required },
    type: {
      type: 'enum',
      values: Object.keys(messageBoardTypeEnum),
      required,
    },
    tag: {
      type: 'enum',
      values: Object.keys(messageBoardTagEnum),
      required: false,
    },
    likes: { type: 'integer', required: false },
  };
};
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

    ctx.validate(messageBoardValidate(), ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.messageBoardService.create(ctx.request.body),
    };
  }

  async update() {
    const { ctx, service } = this;

    ctx.validate(
      {
        id: { type: 'string', required: true },
        ...messageBoardValidate('update'),
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
