import { UserType } from './../typings/user';
import { Service } from 'egg';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Page } from '../typings';
import ms from 'ms';
import { encryptPassword } from '../utils/password';

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

  async findByEmailAndUpdatePassword(email: string, password: string) {
    return this.ctx.model.UserModel.updateOne({ email }, { password });
  }

  generateToken(user: UserType) {
    const { ctx, app } = this;
    const { email, _id } = user;

    const token = app.jwt.sign(
      {
        email,
        id: _id,
      },
      app.config.jwt.secret,
      { expiresIn: '48h' },
    );

    ctx.session.user = user;
    ctx.session.maxAge = ms('2d');

    return token;
  }

  clearUser() {
    const { ctx, app } = this;
    const { email, _id } = ctx.session?.user ?? {};

    if (!_id) {
      this.ctx.throw('未登陆');
    }

    app.jwt.sign(
      {
        email,
        id: _id,
      },
      app.config.jwt.secret,
      { expiresIn: '3s' },
    );
    ctx.session = null;
  }

  async verifyPassword(args: {
    email: string;
    password1: string;
    password2: string;
  }) {
    const { email, password1, password2 } = args;

    if (password1 !== password2) {
      throw new Error('两次密码不一致');
    }

    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error('未找到该邮箱');
    }

    if (user.password === encryptPassword(password1)) {
      throw new Error('密码不能与之前一致');
    }
  }

  async verifyOldPassword(email: string, oldPassword: string) {
    const user = await this.findOne({ email, password: oldPassword });
    if (!user) {
      throw new Error('旧密码错误');
    }
  }
}
