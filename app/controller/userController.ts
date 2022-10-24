import { Controller } from 'egg';
import { UserType } from '../typings/user';
import crypto from 'crypto';
import { SECRET_KEY } from '../../config';

export default class UserController extends Controller {
  public async userInfo() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const { userService } = ctx.service;

    await userService
      .findById(id)
      .then((res) => {
        if (res) {
          ctx.body = {
            data: userService.formatUserInfo(res),
            message: 'find user information success',
            success: true,
          };
        } else {
          ctx.body = {
            data: null,
            message: 'find user information failed',
            success: false,
          };
        }
      })
      .catch((err) => {
        ctx.body = {
          data: null,
          message: 'find user information failed',
          success: false,
          err,
        };
      });
  }

  // 对传递过来的密码进行加密
  public encryptPassword(password: string) {
    const md5 = crypto.createHash('md5');
    md5.update(String(password));
    md5.update(SECRET_KEY);

    return md5.digest('hex');
  }

  public async userList() {
    const { ctx } = this;
    const { userService } = ctx.service;

    await userService
      .findBy()
      .then((res: UserType[]) => {
        ctx.body = {
          data: res?.map((user) => userService.formatUserInfo(user)),
          message: 'fined user success',
          success: true,
        };
      })
      .catch((err) => {
        ctx.body = {
          data: null,
          message: 'fined user failed',
          success: false,
          err,
        };
      });
  }

  public async createUser() {
    const { ctx } = this;
    const { email, password, ...restUser } = ctx.request.body;
    const { userService } = ctx.service;

    const existUser = await userService.findUserByEmail(email);

    if (existUser) {
      ctx.body = {
        data: null,
        message: 'account already existed',
        success: false,
      };

      return;
    }

    await userService
      .createUser({
        email,
        password: this.encryptPassword(password),
        ...restUser,
      })
      .then((res) => {
        ctx.body = {
          data: userService.formatUserInfo(res),
          message: 'create user success',
          success: true,
        };
      })
      .catch((err) => {
        ctx.body = {
          data: null,
          message: 'create user failed',
          success: false,
          err,
        };
      });
  }

  public async loginUser() {
    const { ctx } = this;
    const { password, email } = ctx.request.body;
    const { userService } = ctx.service;

    const existUser = await userService.findOne({
      password: this.encryptPassword(password),
      email,
    });

    if (existUser) {
      // 生成 token 信息，然后将 token 返回给前端，前端做 localStorage 加在请求头 返回给后端（后端再做校验）
      const token = this.app.jwt.sign(
        {
          email,
          id: existUser._id,
        },
        this.app.config.jwt.secret,
      );

      ctx.body = {
        token,
        success: true,
        message: 'login success',
        data: userService.formatUserInfo(existUser),
      };
    } else {
      ctx.body = {
        data: null,
        message: 'account or password error',
        success: false,
        err: new Error('account or password error'),
      };
    }
  }
}
