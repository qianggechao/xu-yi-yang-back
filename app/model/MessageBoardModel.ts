import { Application } from 'egg';
import {
  messageBoardTagEnum,
  MessageBoardType,
  messageBoardTypeEnum,
} from '../typings/messageBoard';
import { Types } from 'mongoose';

const MessageBoardModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageBoardModelSchema = new Schema(
    {
      user: {
        _id: { type: Types.ObjectId, required: true },
        nickName: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, default: '' },
        brief: { type: String, default: '' },
      },
      content: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: Object.keys(messageBoardTypeEnum),
      },
      likes: { type: Number, default: 0 },
      tag: {
        type: String,
        enum: Object.keys(messageBoardTagEnum),
      },
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<MessageBoardType>(
    'MessageBoard',
    MessageBoardModelSchema,
  );
};

export default MessageBoardModel;
