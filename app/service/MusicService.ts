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
}
