import BaseController from './baseController';
import crypto from 'crypto';
import { SECRET_KEY } from '../../config';
import deleteObjectKey from '../uitls/deleteObjectKey';

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

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await userService.findList(query, page)),
    };
  }

  async userSearch() {
    const { ctx } = this;
    const { userService } = ctx.service;

    ctx.body = {
      success: true,
      data: await userService.useerSearch(ctx.query?.keyword ?? ''),
    };
  }

  public async createUser() {
    const { ctx } = this;
    ctx.validate(
      {
        nickName: { type: 'string', required: true, max: 24 },
        email: { type: 'email', required: true, max: 54 },
        password: { type: 'string', required: true, max: 18, min: 6 },
      },
      ctx.request.body,
    );

    const { email, password, ...restUser } = ctx.request.body;
    this.logger.info('createUser input', ctx.request.body);

    const { userService } = ctx.service;

    const existUser = await userService.findUserByEmail(email);

    if (existUser) {
      ctx.body = {
        data: null,
        msg: '邮箱已被注册',
        success: false,
      };

      return;
    }

    await userService
      .createUser({
        email,
        password: this.encryptPassword(password),
        ...restUser,
        type: 'user',
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

  public async createAdmin() {
    const { ctx } = this;
    ctx.validate(
      {
        nickName: { type: 'string', required: true },
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
        secretKey: 'string',
      },
      ctx.request.body,
    );

    const { email, password, secretKey, ...restUser } = ctx.request.body;
    const { userService } = ctx.service;

    if (
      this.encryptPassword(secretKey) !== '43aa747e79cefe7141fdc69339bdbb9f'
    ) {
      ctx.body = {
        data: null,
        msg: '密钥错误',
        success: false,
      };

      return;
    }

    const existUser = await userService.findUserByEmail(email);
    if (existUser) {
      ctx.body = {
        data: null,
        msg: '邮箱已被注册',
        success: false,
      };

      return;
    }

    await userService
      .createUser({
        email,
        password: this.encryptPassword(password),
        ...restUser,
        type: 'admin',
      })
      .then((res) => {
        ctx.body = {
          data: userService.formatUserInfo(res),
          msg: 'create admin success',
          success: true,
        };
      })
      .catch((error) => {
        ctx.body = {
          data: null,
          msg: 'create admin failed',
          success: false,
          error,
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
        { expiresIn: '48h' },
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
    const { ctx, service } = this;

    try {
      await service.userService.deleteMany();
      ctx.body = {
        data: [],
        success: true,
        msg: '',
        error: {},
      };
    } catch (error) {
      ctx.body = {
        success: false,
        data: null,
        error,
        msg: 'deleteMany user error',
      };
    }
  }

  async delete() {
    const { ctx } = this;
    const { userService } = ctx.service;

    ctx.validate({ id: { type: 'string', required: true } }, ctx.request.query);

    ctx.body = {
      success: true,
      data: await userService.delete(ctx.request.query.id),
    };
  }

  async update() {
    const { ctx } = this;
    const { userService } = ctx.service;

    ctx.validate(
      {
        id: { type: 'string', required: true },
        nickName: { type: 'string', required: false },
        avatar: { type: 'string', required: false },
        brief: { type: 'string', required: false },
      },
      ctx.request.body,
    );

    const body = deleteObjectKey(
      ['email', 'password', 'type'],
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await userService.updete(ctx.request.body.id, body),
    };
  }
}
