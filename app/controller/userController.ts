import BaseController from './baseController';
import deleteObjectKey from '../utils/deleteObjectKey';
import { generateCaptcha, generateNumber } from '../utils/generate';
import svgCaptcha from 'svg-captcha';
import ms from 'ms';
import { encryptPassword } from '../utils/password';

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
      data: await userService.userSearch(ctx.query?.keyword ?? ''),
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
        password: encryptPassword(password),
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

    if (secretKey !== process.env.MONGO_PASSWORD) {
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
        password: encryptPassword(password),
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

    const userEmail = await userService.findUserByEmail(email);
    if (!userEmail) {
      throw new Error('邮箱错误');
    }

    const existUser = await userService.findOne({
      password: encryptPassword(password),
      email,
    });
    if (!existUser) {
      throw new Error('密码错误');
    }

    ctx.body = {
      token: userService.generateToken(existUser),
      success: true,
      msg: 'login success',
      data: userService.formatUserInfo(existUser),
    };
  }

  public loginOut() {
    const { ctx, service } = this;

    service.userService.clearUser();

    ctx.body = {
      success: true,
      data: 'ok',
      msg: '退出成功',
    };
  }

  public async deleteMany() {
    const { ctx, service } = this;

    await service.userService.deleteMany();

    ctx.body = {
      data: [],
      success: true,
    };
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

  async updateUser() {
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

    this.verifyPrivateApi(body.id);

    ctx.body = {
      success: true,
      data: await userService.update(body.id, body),
    };
  }

  getRegisterCaptcha() {
    const { ctx } = this;
    const captcha = generateCaptcha(4);

    ctx.session.captcha = captcha;
    ctx.session.maxAge = ms('60m');

    ctx.body = {
      success: true,
      data: captcha,
    };
  }

  async getSvgCaptcha() {
    const { ctx } = this;
    const { data, text } = svgCaptcha.create();

    ctx.session.captcha = text;
    ctx.session.maxAge = ms('60m');

    ctx.response.type = 'image/svg+xml';
    ctx.body = data;
  }

  async sendUpdatePasswordEmailCaptcha() {
    const { ctx, service } = this;
    const { body } = ctx.request;

    ctx.validate(
      {
        email: { type: 'email', required: true },
        captcha: { type: 'string', required: true },
      },
      body,
    );

    const isCheck = this.checkCaptcha(body.captcha);
    if (!isCheck) {
      ctx.throw(400, '验证码错误');
    }

    const user = await service.userService.findUserByEmail(body.email);
    if (user) {
      const emailCaptcha = generateNumber(4);
      ctx.session.emailCaptcha = emailCaptcha;
      ctx.session.maxAge = ms('60m');

      ctx.body = {
        success: true,
        data: await service.emailService.sendEmailCaptcha(
          body.email,
          user.nickName,
          emailCaptcha,
        ),
        msg: '发送成功',
      };
    } else {
      ctx.body = {
        success: false,
        data: null,
        msg: '邮箱错误，该邮箱未被注册',
      };
    }
  }

  async updateUserPasswordByEmailCaptcha() {
    const { ctx, service } = this;
    const { body } = ctx.request;

    ctx.validate(
      {
        email: { type: 'email', required: true, max: 54 },
        emailCaptcha: { type: 'string', required: true },
        password1: { type: 'string', required: true, max: 18, min: 6 },
        password2: { type: 'string', required: true, max: 18, min: 6 },
      },
      body,
    );

    await service.emailService.verifyEmailCaptcha(
      body.email,
      body.emailCaptcha,
    );
    await service.userService.verifyPassword(body);

    ctx.body = {
      success: true,
      data: await service.userService.findByEmailAndUpdatePassword(
        body.email,
        encryptPassword(body.password1),
      ),
      msg: '修改成功',
    };

    this.clearCaptcha();
  }

  async updatePassword() {
    const { ctx, service } = this;
    const { body } = ctx.request;

    ctx.validate(
      {
        email: { type: 'string', required: true },
        oldPassword: { type: 'string', required: true, max: 18, min: 6 },
        newPassword1: { type: 'string', required: true, max: 18, min: 6 },
        newPassword2: { type: 'string', required: true, max: 18, min: 6 },
      },
      body,
    );

    const { email, oldPassword, newPassword1, newPassword2 } = body;

    this.verifyPrivateApiByEmail(email);

    await service.userService.verifyOldPassword(
      email,
      encryptPassword(oldPassword),
    );

    await service.userService.verifyPassword({
      email,
      password1: newPassword1,
      password2: newPassword2,
    });

    ctx.body = {
      success: true,
      data: await service.userService.findByEmailAndUpdatePassword(
        email,
        encryptPassword(newPassword1),
      ),
      msg: '修改成功',
    };
  }
}
