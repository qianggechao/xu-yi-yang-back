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
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.MusicModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .populate('message.user', { password: 0 })
      .lean();

    const total = await this.ctx.model.MusicModel.find(
      filter ?? {},
    ).countDocuments();

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

  async setStar(musicId: string, userId: string) {
    const isStar = await this.ctx.model.MusicModel.findOne({
      _id: musicId,
      star: userId,
    });

    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      [isStar ? '$pull' : '$push']: { star: userId },
    });
  }

  async setManyStar(musicId: string, userIds: string[]) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: { star: userIds },
    });
  }

  async setLike(musicId: string, userId: string) {
    const isLike = await this.ctx.model.MusicModel.findOne({
      _id: musicId,
      like: userId,
    });

    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      [isLike ? '$pull' : '$push']: { like: userId },
    });
  }

  async setManyLike(musicId: string, userIds: string[]) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: { like: userIds },
    });
  }

  async addMessage(musicId: string, userId: string, content: string) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $push: {
        messages: { content, user: userId },
      },
    });
  }

  async updateMessage(musicId: string, messageId: string, content: string) {
    return this.ctx.model.MusicModel.findOneAndUpdate(
      { _id: musicId, 'messages._id': messageId },
      { $set: { 'messages.$.content': content } },
    );
  }

  async deleteMessage(musicId: string, messageId: string) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $pull: {
        messages: { _id: messageId },
      },
    });
  }

  async setManyMessage(
    musicId: string,
    messages: { user: string; content: string }[],
  ) {
    return this.ctx.model.MusicModel.findByIdAndUpdate(musicId, {
      $set: { messages },
    });
  }
}
