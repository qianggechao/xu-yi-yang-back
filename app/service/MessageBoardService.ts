import { Service } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import filterEmptyObject from '../uitls/filterEmptyObject';

export default class MessageBoardService extends Service {
  async findList(
    message: FilterQuery<{
      userId?: string;
      content?: string;
      type?: string;
      links?: number;
      tag?: string;
    }>,
    page?: Page,
  ) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};
    const { userId, ...rest } = message;
    const { ObjectId } = Types;

    const query = filterEmptyObject({
      ...{ 'user._id': userId ? ObjectId(userId.toString()) : '' },
      ...rest,
    });

    const data = await this.ctx.model.MessageBoardModel.find(query)
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    const total = await this.ctx.model.MessageBoardModel.find(
      query,
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

  async update(
    id: string,
    update: UpdateQuery<Omit<MessageBoardType, 'user'>>,
  ) {
    return this.ctx.model.MessageBoardModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.MessageBoardModel.findByIdAndDelete(id);
  }
}
