import { Application } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
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
        avator: { type: String },
        brief: { type: String },
      },
      content: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: ['message', 'complaint', 'suggest'],
      },
      likes: { type: Number, default: 0 },
      tag: {
        type: String,
        enum: ['hot', 'best', 'top'],
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
