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
    const data = await this.ctx.model.MusicModel.find(filter ?? {}, {
      'like.userIds': 0,
    })
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

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
      return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
        $pull: { 'like.userIds': userId },
        'like.count': 0,
      });
    }

    const count =
      (await this.ctx.model.MusicModel.findById(id))?.like?.count || 0;

    return this.ctx.model.MusicModel.findByIdAndUpdate(id, {
      $addToSet: { 'like.userIds': userId },
      'like.count': count + 1,
    });
  }
}
