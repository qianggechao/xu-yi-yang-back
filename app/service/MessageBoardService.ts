import { Service } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
import { FilterQuery } from 'mongoose';
import { Page } from '../typings';

export default class MessageBoardService extends Service {
  async findList(message: FilterQuery<MessageBoardType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};

    const data = await this.ctx.model.MessageBoardModel.find(message)
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    const total = await this.ctx.model.MessageBoardModel.find(
      message,
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(message: {
    userId: string;
    content: string;
    type?: string;
    links?: number;
  }) {
    const { userId, ...rest } = message;
    const user = await this.service.userService.findById(userId);

    return this.ctx.model.MessageBoardModel.create({ ...rest, user });
  }
}
