import { Service } from 'egg';
import { Page } from '../typings';
import { BannerType } from '../typings/banner';
import { FilterQuery, UpdateQuery } from 'mongoose';

/**
 * Banner Service
 */
export default class Banner extends Service {
  public async findList(banner?: FilterQuery<BannerType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.BannerModel.find(banner ?? {})
      .limit(pageSize)
      .skip(pageSize / (currentPage + 1))
      .sort({ sort: 1 });

    const total = await this.ctx.model.BannerModel.find(
      banner ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  public async create(banner: BannerType) {
    return this.ctx.model.BannerModel.create(banner);
  }

  async update(id: string, update: UpdateQuery<BannerType>) {
    return this.ctx.model.BannerModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.BannerModel.findByIdAndDelete(id);
  }
}
