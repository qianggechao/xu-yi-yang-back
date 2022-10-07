import { UserType } from './../typings/user';
import { Service } from 'egg';
import { FilterQuery } from 'mongoose';

export default class UserService extends Service {
  public formatUserInfo(info: UserType | null) {
    if (!info) return info;

    // password not should return frontend
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = info;

    return rest;
  }

  public async findUserByEmail(email: string): Promise<UserType | null> {
    return this.ctx.model.UserModel.findOne({ email });
  }

  public async findById(id: string): Promise<UserType | null> {
    return this.ctx.model.UserModel.findById(id);
  }

  public async createUser(userInfo: UserType): Promise<UserType> {
    return this.ctx.model.UserModel.create(userInfo);
  }

  public async findBy(filter?: FilterQuery<UserType>): Promise<UserType[]> {
    return this.ctx.model.UserModel.find(filter || {});
  }

  public async findOne(
    filter: FilterQuery<UserType>,
  ): Promise<UserType | null> {
    return this.ctx.model.UserModel.findOne(filter);
  }
}
