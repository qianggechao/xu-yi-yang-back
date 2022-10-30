import { Service } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
import { FilterQuery } from 'mongoose';
import { Page } from '../typings';
export default class MessageBoardService extends Service {
    findList(message: FilterQuery<MessageBoardType>, page?: Page): Promise<{
        data: Promise<MessageBoardType[]>;
        currentPage: number;
        pageSize: number;
        total: Promise<number>;
    }>;
    create(message: FilterQuery<MessageBoardType>): Promise<MessageBoardType>;
}
