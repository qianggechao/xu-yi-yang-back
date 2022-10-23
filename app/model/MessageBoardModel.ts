import { Application } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
import { UserSchemaType } from './UserModel';

const MessageBoardModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MessageBoardModelSchema = new Schema(
    {
      user: UserSchemaType,
      content: { type: String, required: true },
      type: { type: String, required: true },
    },
    { timestamps: true },
  );

  return mongoose.model<MessageBoardType>(
    'MessageBoard',
    MessageBoardModelSchema,
  );
};

export default MessageBoardModel;
