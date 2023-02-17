import { Service } from 'egg';
import { ConfigType } from '../typings/config';
import { UpdateQuery, FilterQuery } from 'mongoose';
import { Page } from '../typings';

export default class ConfigService extends Service {
  async findList(filter: FilterQuery<ConfigType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.ConfigMode.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .lean();

    const total = await this.ctx.model.ConfigMode.find(
      filter ?? {},
    ).countDocuments();

    return {
      data,
      total,
      pageSize,
      currentPage,
    };
  }

  async findByTitle(title: string) {
    return this.ctx.model.ConfigMode.findOne({ title });
  }

  async create(config: ConfigType) {
    return this.ctx.model.ConfigMode.create(config);
  }

  async update(id: string, update: UpdateQuery<ConfigType>) {
    return this.ctx.model.ConfigMode.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.ConfigMode.findByIdAndDelete(id);
  }
}
