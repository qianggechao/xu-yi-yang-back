import { Service } from 'egg';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import { StageType } from '../typings/stage';

export default class StageService extends Service {
  async findList(filter?: FilterQuery<StageType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};
    const data = await this.ctx.model.StageModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    const total = await this.ctx.model.StageModel.find(
      filter ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(stage: StageType) {
    return this.ctx.model.StageModel.create(stage);
  }

  async update(id: string, update: UpdateQuery<StageType>) {
    return this.ctx.model.StageModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.StageModel.findByIdAndDelete(id);
  }
}
