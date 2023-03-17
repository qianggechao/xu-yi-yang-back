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

  async setOpusStar() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        userId: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.setStar(body.opusId, body.userId),
    };
  }

  async setManyOpusStar() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        userIds: { type: 'array', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.setManyStar(body.opusId, body.userIds),
    };
  }

  async setOpusLike() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        userId: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.setLike(body.opusId, body.userId),
    };
  }

  async setManyOpusLike() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        userIds: { type: 'array', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.setManyLike(body.opusId, body.userIds),
    };
  }

  async addOpusMessage() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        userId: { type: 'string', required: true },
        content: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.addMessage(
        body.opusId,
        body.userId,
        body.content,
      ),
    };
  }

  async updateOpusMessage() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        messageId: { type: 'string', required: true },
        content: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.updateMessage(
        body.opusId,
        body.messageId,
        body.content,
      ),
    };
  }

  async deleteOpusMessage() {
    const { ctx, service } = this;
    const query = ctx.request.query;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        messageId: { type: 'string', required: true },
      },
      query,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.deleteMessage(
        query.opusId,
        query.messageId,
      ),
    };
  }

  async setManyOpusMessage() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        opusId: { type: 'string', required: true },
        messages: { type: 'array', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.opusService.setManyMessage(
        body.opusId,
        body.messages,
      ),
    };
  }
}
