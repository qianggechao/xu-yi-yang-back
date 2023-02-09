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
      data: (await service.musicService.delete(ctx.request.query.id)) || {},
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

  async deleteMusicChildren() {
    const { ctx, service } = this;
    const query = ctx.request.query;

    ctx.validate(
      {
        musicId: { type: 'string', required: true },
        childrenId: { type: 'string', required: true },
      },
      query,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.deleteChildren(
        query.musicId,
        query.childrenId,
      ),
    };
  }

  async setMusicLike() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        userId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.setLike(body.musicId, body.userId),
    };
  }

  async setMusicManyLike() {
    const { ctx, service } = this;
    const body = ctx.request.body;

    ctx.validate(
      {
        userIds: { type: 'array', required: true },
        musicId: { type: 'string', required: true },
      },
      body,
    );

    ctx.body = {
      success: true,
      data: await service.musicService.setManyLike(body.musicId, body.userIds),
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

  async deleteMusicMessage() {
    const { ctx, service } = this;

    ctx.validate(
      {
        messageId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
      },
      ctx.request.query,
    );

    const { messageId, musicId } = ctx.request.query;
    ctx.body = {
      success: true,
      data: await service.musicService.deleteMessage(musicId, messageId),
    };
  }

  async setMusicManyMessage() {
    const { ctx, service } = this;

    ctx.validate(
      {
        musicId: { type: 'string', required: true },
        messages: { type: 'array', required: true },
      },
      ctx.request.body,
    );

    const { messages, musicId } = ctx.request.body;
    ctx.body = {
      success: true,
      data: await service.musicService.setManyMessage(musicId, messages),
    };
  }

  async setMusicStart() {
    const { ctx, service } = this;

    ctx.validate(
      {
        userId: { type: 'string', required: true },
        musicId: { type: 'string', required: true },
      },
      ctx.request.body,
    );

    const { userId, musicId } = ctx.request.body;
    ctx.body = {
      success: true,
      data: await service.musicService.setStart(musicId, userId),
    };
  }

  async setMusicManyStart() {
    const { ctx, service } = this;

    ctx.validate(
      {
        userIds: { type: 'array', required: true },
        musicId: { type: 'string', required: true },
      },
      ctx.request.body,
    );

    const { userIds, musicId } = ctx.request.body;
    ctx.body = {
      success: true,
      data: await service.musicService.setManyStart(musicId, userIds),
    };
  }
}
