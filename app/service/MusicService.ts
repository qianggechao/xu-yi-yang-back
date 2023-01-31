import { Service } from 'egg';
import { MusicType, MusicTypeEnum } from '../typings/music';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';

type FilterMusic = {
  name: string;
  type: keyof typeof MusicTypeEnum;
};

export default class MusicService extends Service {
  async findList(filter?: FilterQuery<FilterMusic>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};
    const data = await this.ctx.model.MusicModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .populate('message.data.user like.userIds', { password: 0 });

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
}
