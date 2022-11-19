import { Application } from 'egg';
import { UserType } from '../typings/user';

const UserModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      nickName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      avator: { type: String },
      brief: { type: String },
      type: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'superAdmin'],
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<UserType>('User', UserSchema);
};

export default UserModel;
