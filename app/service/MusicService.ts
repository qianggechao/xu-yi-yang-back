import { Service } from 'egg';
import { MusicType, MusicTypeEnum } from '../typings/music';
import { FilterQuery, UpdateQuery, Types } from 'mongoose';
import { Page } from '../typings';

type FilterMusic = {
  name: string;
  type: keyof typeof MusicTypeEnum;
};

export default class MusicService extends Service {
  objectIdIncludes(id: string, ids: string[]) {
    return ids.some((item) => Types.ObjectId(item).equals(Types.ObjectId(id)));
  }

  async findList(filter?: FilterQuery<FilterMusic>, page?: Page) {
    const userId = this.ctx.state.user._id;
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const musics = await this.ctx.model.MusicModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .populate('message.data.user like.userIds', { password: 0 })
      .lean();

    const total = await this.ctx.model.MusicModel.find(
      filter ?? {},
    ).countDocuments();

    const data = musics.map((item) => {
      const { start, like } = item;

      return {
        ...item,
        start: {
          ...start,
          isStart: start?.userIds?.some((item) => item?.equals(userId)),
        },
        like: {
          ...like,
          isLike: like?.userIds?.some(
            (item) => item?.equals && item?.equals(userId),
          ),
        },
      };
    });

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(music: MusicType) {
    return this.ctx.model.MusicModel.create(music);
  }

  async update(id: string, update: UpdateQuery<MusicType>) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.MusicModel.findByIdAndDelete(id);
  }

  async addChildren(id: string, children: MusicType[]) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
      $push: { children },
    });
  }

  async updateChildren(id: string, children: MusicType[]) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
      $set: { children },
    });
  }

  async deleteChildren(musicId: string, childrenId: string) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $pull: { children: { _id: childrenId } },
    });
  }

  async setLike(id: string, userId: string) {
    const music = await this.ctx.model.MusicModel.findOne({
      _id: id,
      'like.userIds': userId,
    });

    if (music) {
      const count = music.like?.count || 0;

      return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
        $pull: { 'like.userIds': userId },
        'like.count': count > 0 ? count - 1 : 0,
        'like.isLike': false,
      });
    }

    const count =
      (await this.ctx.model.MusicModel.findById(id))?.like?.count || 0;

    return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
      $addToSet: { 'like.userIds': userId },
      'like.count': count + 1,
      'like.isLike': true,
    });
  }

  async setManyLike(musicId: string, userIds: string[]) {
    const unqUsers = Array.from(new Set(userIds));
    const userId = this.ctx.state.user._id;
    const isLike = this.objectIdIncludes(userId, userIds);

    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: { like: { userIds: unqUsers, count: unqUsers.length, isLike } },
    });
  }

  async setStart(musicId: string, userId: string) {
    const music = await this.ctx.model.MusicModel.findOne({
      _id: musicId,
      'start.userIds': userId,
    });

    if (music) {
      const count = music.start?.count || 0;

      return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
        $pull: { 'start.userIds': userId },
        'start.count': count > 0 ? count - 1 : 0,
        'start.isStart': false,
      });
    }

    const count =
      (await this.ctx.model.MusicModel.findById(musicId))?.start?.count || 0;

    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $addToSet: { 'start.userIds': userId },
      'start.count': count + 1,
      'start.isStart': true,
    });
  }

  async setManyStart(musicId: string, userIds: string[]) {
    const unqUsers = Array.from(new Set(userIds));
    const userId = this.ctx.state.user._id;
    const isStart = this.objectIdIncludes(userId, userIds);

    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: {
        start: { userIds: unqUsers, count: unqUsers.length, isStart },
      },
    });
  }

  async addMessage(id: string, userId: string, content: string) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
      $push: {
        'message.data': { content, user: userId },
      },
      'message.count': 1,
    }).populate('message.data.user like.userIds', { password: 0 });
  }

  async updateMessage(musicId: string, messageId: string, content: string) {
    return this.ctx.model.MusicModel.findOneAndUpdate(
      {
        _id: musicId,
        'message.data._id': messageId,
      },
      { $set: { 'message.data.$.content': content } },
    ).populate('message.data.user like.userIds', { password: 0 });
  }

  async deleteMessage(musicId: string, messageId: string) {
    return this.ctx.model.MusicModel.findOneAndUpdate(
      {
        _id: musicId,
        'message.data._id': messageId,
      },
      { $pull: { 'message.data': { _id: messageId } } },
    ).populate('message.data.user like.userIds', { password: 0 });
  }

  async setManyMessage(
    musicId: string,
    messages: { user: string; content: string }[],
  ) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: { message: { data: messages, count: messages.length } },
    });
  }
}
