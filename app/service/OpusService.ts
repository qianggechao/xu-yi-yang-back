import { Service } from 'egg';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import { OpusType } from '../typings/opus';

export default class OpusService extends Service {
  async findList(filter?: FilterQuery<OpusType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};
    const data = await this.ctx.model.OpusModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    const total = await this.ctx.model.OpusModel.find(
      filter ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(stage: OpusType) {
    return this.ctx.model.OpusModel.create(stage);
  }

  async update(id: string, update: UpdateQuery<OpusType>) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.OpusModel.findByIdAndDelete(id);
  }
}
