import { UserType } from './../typings/user';
import { Service } from 'egg';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import { generateNumber } from '../utils/generate';

export default class UserService extends Service {
  public formatUserInfo(info: UserType | null) {
    if (!info) return info;

    // password not should return frontend
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // TODO: 扩展的 rest 多了许多的东西
    // const { password, ...rest } = info;

    return info;
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

  public async userSearch(keyword: string): Promise<UserType[]> {
    return this.ctx.model.UserModel.find({
      $or: [{ nickName: { $regex: keyword } }, { email: { $regex: keyword } }],
    });
  }

  public async findOne(
    filter: FilterQuery<UserType>,
  ): Promise<UserType | null> {
    return this.ctx.model.UserModel.findOne(filter, { password: 0 });
  }

  public async deleteMany() {
    return this.ctx.model.UserModel.deleteMany();
  }

  async findList(filter?: FilterQuery<UserType>, page?: Page) {
    const { pageSize = 10, currentPage = 1 } = page ?? {};

    const data = await this.ctx.model.UserModel.find(filter ?? {})
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1))
      .lean();

    const total = await this.ctx.model.UserModel.find(
      filter ?? {},
    ).countDocuments();

    return {
      data,
      currentPage,
      pageSize,
      total,
    };
  }

  async delete(id: string) {
    return this.ctx.model.UserModel.findByIdAndDelete(id);
  }

  async update(id: string, update: UpdateQuery<UserType>) {
    return this.ctx.model.UserModel.findByIdAndUpdate(id, update);
  }

  async sendUpdatePasswordEmailCaptcha(email: string) {
    const user = await this.findUserByEmail(email);

    if (user) {
      return {
        success: true,
        data: await this.ctx.service.emailService.sendEmailCaptcha(
          email,
          user.nickName,
          generateNumber(4),
        ),
        msg: '发送成功',
      };
    }

    return {
      success: false,
      data: null,
      msg: '邮箱错误，该邮箱未被注册',
    };
  }
}
