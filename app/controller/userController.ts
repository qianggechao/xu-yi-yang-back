import BaseController from './baseController';
import { UserType } from '../typings/user';
import crypto from 'crypto';
import { SECRET_KEY } from '../../config';

export default class UserController extends BaseController {
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
            msg: 'find user information success',
            success: true,
          };
        } else {
          ctx.body = {
            data: null,
            msg: 'find user information failed',
            success: false,
          };
        }
      })
      .catch((error) => {
        ctx.body = {
          data: null,
          msg: 'find user information failed',
          success: false,
          error,
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
          msg: 'fined user success',
          success: true,
        };
      })
      .catch((err) => {
        ctx.body = {
          data: null,
          msg: 'fined user failed',
          success: false,
          err,
        };
      });
  }

  public async createUser() {
    const { ctx } = this;
    const { email, password, ...restUser } = ctx.request.body;
    this.logger.info('createUser input', ctx.request.body);

    const { userService } = ctx.service;

    const existUser = await userService.findUserByEmail(email);

    if (existUser) {
      ctx.body = {
        data: null,
        msg: 'account already existed',
        success: false,
      };

      return;
    }

    if (password.length < 6) {
      this.ctx.body = {
        success: false,
        data: null,
        msg: '密码长度小于6位',
      };
    } else {
      await userService
        .createUser({
          email,
          password: this.encryptPassword(password),
          ...restUser,
        })
        .then((res) => {
          ctx.body = {
            data: userService.formatUserInfo(res),
            msg: 'create user success',
            success: true,
          };
        })
        .catch((error) => {
          ctx.body = {
            data: null,
            msg: 'create user failed',
            success: false,
            error,
          };
        });
    }
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
        msg: 'login success',
        data: userService.formatUserInfo(existUser),
      };
    } else {
      ctx.body = {
        data: null,
        msg: 'account or password error',
        success: false,
        error: new Error('account or password error'),
      };
    }
  }

  public async deleteMany() {
    this.setBody(this.service.userService.deleteMany());
  }
}
