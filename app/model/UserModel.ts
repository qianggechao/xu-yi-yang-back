import { Application } from 'egg';
import { UserType } from '../typings/user';

const UserSchemaType = {
  nickName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avator: { type: String },
  brief: { type: String },
};

const UserModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(UserSchemaType, {
    timestamps: true,
    versionKey: false,
  });

  return mongoose.model<UserType>('User', UserSchema);
};

export { UserSchemaType };
export default UserModel;
