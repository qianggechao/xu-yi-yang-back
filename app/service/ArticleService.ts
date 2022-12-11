import { Service } from 'egg';
import { ArticleType } from '../typings/Article';
import { UpdateQuery, FilterQuery } from 'mongoose';
import { Page } from '../typings';

export default class ArticleService extends Service {
  async findList(article?: FilterQuery<ArticleType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.ArticleModel.find(article ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    const total = await this.ctx.model.ArticleModel.find(
      article ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async findByTitle(title: string) {
    return this.ctx.model.ArticleModel.findOne({ title });
  }

  async create(article: ArticleType) {
    return this.ctx.model.ArticleModel.create(article);
  }

  async update(id: string, update: UpdateQuery<ArticleType>) {
    return this.ctx.model.ArticleModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.ArticleModel.findByIdAndDelete(id);
  }
}
