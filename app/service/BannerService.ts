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

    const banners = this.ctx.model.BannerModel.find(banner ?? {});
    const data = banners
      .skip(currentPage)
      .limit(pageSize)
      .sort({ sort: -1 })
      .exec();

    return {
      data,
      currentPage,
      pageSize,
      total: banners.countDocuments().exec(),
    };
  }

  public async create(banner: BannerType) {
    return this.ctx.model.BannerModel.create(banner);
  }
}
