import { MusicTypeEnum } from '../typings/music';
import BaseController from './baseController';

const musicValidate = (action: 'update' | 'create' = 'create') => {
  const required = action === 'create';

  return {
    name: { type: 'string', required },
    type: {
      type: 'enum',
      values: Object.keys(MusicTypeEnum),
      required,
    },
    url: { type: 'string', required },
    link: { type: 'string', required: false },
    description: { type: 'string', required: false },
    lyric: { type: 'string', required: false },
    cover: { type: 'string', required: false },
    avatar: { type: 'string', required: false },
  };
};

export default class MusicController extends BaseController {
  async musicList() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.musicService.findList(query, page)),
    };
  }

  async createMusic() {
    const { ctx, service } = this;

    ctx.validate(musicValidate(), ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.musicService.create(ctx.request.body),
    };
  }

  async updateMusic() {
    const { ctx, service } = this;

    ctx.validate(
      { ...musicValidate('update'), id: { type: 'string', required: true } },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async deleteMusic() {
    const { ctx, service } = this;

    ctx.validate({ id: { type: 'string', required: true } }, ctx.request.query);

    ctx.body = {
      success: true,
      data: await service.musicService.delete(ctx.request.query.id),
    };
  }

  async addMusicChildren() {
    const { ctx, service } = this;

    ctx.validate(
      { id: { type: 'string', required: true }, children: 'array' },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.addChildren(
        ctx.request.body.id,
        ctx.request.body.children,
      ),
    };
  }

  async updateMusicChildren() {
    const { ctx, service } = this;

    ctx.validate(
      { id: { type: 'string', required: true }, children: 'array' },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.updateChildren(
        ctx.request.body.id,
        ctx.request.body.children,
      ),
    };
  }

  async setMusicLike() {
    const { ctx, service } = this;

    ctx.validate(
      {
        userId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.setLike(
        ctx.request.body.musicId,
        ctx.request.body.userId,
      ),
    };
  }

  async addMusicMessage() {
    const { ctx, service } = this;

    ctx.validate(
      {
        userId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
        content: { type: 'string', required: true },
      },
      ctx.request.body,
    );

    const { userId, musicId, content } = ctx.request.body;

    ctx.body = {
      success: true,
      data: await service.musicService.addMessage(musicId, userId, content),
    };
  }

  async updateMusicMessage() {
    const { ctx, service } = this;

    ctx.validate(
      {
        messageId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
        content: { type: 'string', required: true },
      },
      ctx.request.body,
    );

    const { messageId, musicId, content } = ctx.request.body;
    ctx.body = {
      success: true,
      data: await service.musicService.updateMessage(
        musicId,
        messageId,
        content,
      ),
    };
  }
}
