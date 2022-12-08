import { Document } from 'mongoose';
import { UserType } from './user';

export interface MessageBoardType extends Document {
  user: UserType;
  content: string;
  type: string;
  links?: number;
  tag?: string;
}

export enum messageBoardTagEnum {
  hot = '最热',
  best = '最好',
  top = '置顶',
}

export enum messageBoardTypeEnum {
  message = '留言',
  complaint = '投诉',
  suggest = '建议',
}
