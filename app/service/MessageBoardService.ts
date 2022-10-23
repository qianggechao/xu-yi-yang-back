import { Service } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
import { FilterQuery } from 'mongoose';
import { Page } from '../typings';

export default class MessageBoardService extends Service {
  async findList(message: FilterQuery<MessageBoardType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = this.ctx.model.MessageBoardModel.find(message)
      .skip(currentPage)
      .limit(pageSize)
      .sort({ sort: -1 })
      .exec();

    const total = this.ctx.model.MessageBoardModel.find(message)
      .countDocuments()
      .exec();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(message: FilterQuery<MessageBoardType>) {
    return this.ctx.model.MessageBoardModel.create(message);
  }
}
