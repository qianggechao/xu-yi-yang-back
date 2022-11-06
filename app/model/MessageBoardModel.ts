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
      type: { type: String, required: true },
      likes: Number,
      tag: String,
    },
    { timestamps: true },
  );

  return mongoose.model<MessageBoardType>(
    'MessageBoard',
    MessageBoardModelSchema,
  );
};

export default MessageBoardModel;
