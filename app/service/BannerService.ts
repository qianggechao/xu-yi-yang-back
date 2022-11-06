import { Service } from 'egg';
import { Page } from '../typings';
import { BannerType } from '../typings/banner';
import { FilterQuery } from 'mongoose';

/**
 * Banner Service
 */
export default class Banner extends Service {
  public async findList(banner?: FilterQuery<BannerType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.BannerModel.find(banner ?? {}).exec();

    const total = await this.ctx.model.BannerModel.find(banner ?? {})
      .countDocuments()
      .exec();

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
}
