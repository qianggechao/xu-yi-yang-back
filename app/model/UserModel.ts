import { Application } from 'egg';
import { UserType } from '../typings/user';

const UserModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      nickName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avator: { type: String },
      brief: { type: String },
    },
    { timestamps: true },
  );

  return mongoose.model<UserType>('User', UserSchema);
};

export default UserModel;

// class UserModelC {
//   constructor()
// }
