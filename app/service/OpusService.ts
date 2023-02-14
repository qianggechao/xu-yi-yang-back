import { Service } from 'egg';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import { OpusType } from '../typings/opus';

export default class OpusService extends Service {
  async findList(filter?: FilterQuery<OpusType>, page?: Page) {
    const { currentPage = 1, pageSize = 10 } = page ?? {};
    const data = await this.ctx.model.OpusModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .populate('message.user', { password: 0 })
      .lean();

    const total = await this.ctx.model.OpusModel.find(
      filter ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async create(stage: OpusType) {
    return this.ctx.model.OpusModel.create(stage);
  }

  async update(id: string, update: UpdateQuery<OpusType>) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(id, update);
  }

  async delete(id: string) {
    return this.ctx.model.OpusModel.findByIdAndDelete(id);
  }

  async setStar(opusId: string, userId: string) {
    const isStar = await this.ctx.model.OpusModel.findOne({
      _id: opusId,
      star: userId,
    });

    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      [isStar ? '$pull' : '$push']: { star: userId },
    });
  }

  async setManyStar(opusId: string, userIds: string[]) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      $set: { star: userIds },
    });
  }

  async setLike(opusId: string, userId: string) {
    const isLike = await this.ctx.model.OpusModel.findOne({
      _id: opusId,
      like: userId,
    });

    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      [isLike ? '$pull' : '$push']: { like: userId },
    });
  }

  async setManyLike(opusId: string, userIds: string[]) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      $set: { like: userIds },
    });
  }

  async addMessage(opusId: string, userId: string, content: string) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      $push: {
        messages: { content, user: userId },
      },
    });
  }

  async updateMessage(opusId: string, messageId: string, content: string) {
    return this.ctx.model.OpusModel.findOneAndUpdate(
      { _id: opusId, 'messages._id': messageId },
      { $set: { 'messages.$.content': content } },
    );
  }

  async deleteMessage(opusId: string, messageId: string) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      $pull: {
        messages: { _id: messageId },
      },
    });
  }

  async setManyMessage(
    opusId: string,
    messages: { user: string; content: string }[],
  ) {
    return this.ctx.model.OpusModel.findByIdAndUpdate(opusId, {
      $set: { messages },
    });
  }
}
