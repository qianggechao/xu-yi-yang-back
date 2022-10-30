import { Service } from 'egg';
import { Page } from '../typings';
import { BannerType } from '../typings/banner';
import { FilterQuery } from 'mongoose';
/**
 * Banner Service
 */
export default class Banner extends Service {
    findList(banner?: FilterQuery<BannerType>, page?: Page): Promise<{
        data: Promise<BannerType[]>;
        currentPage: number;
        pageSize: number;
        total: Promise<number>;
    }>;
    create(banner: BannerType): Promise<BannerType>;
}
