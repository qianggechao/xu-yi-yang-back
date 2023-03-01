import { Controller } from 'egg';

export default class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  async setBody<R>(service: Promise<R>) {
    try {
      this.ctx.body = {
        success: true,
        ...(await service),
      };
    } catch (error) {
      this.ctx.body = {
        success: false,
        data: null,
        error,
      };
    }
  }

  failed(message: string) {
    this.ctx.body = {
      success: false,
      data: null,
      message,
    };
  }

  notFound(msg: string) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }

  getPage(query: Record<string, any>) {
    return {
      currentPage: parseInt(query?.currentPage || 1),
      pageSize: parseInt(query?.pageSize || 10),
    };
  }

  filterPage(query: Record<string, any>) {
    const copyQuery = { ...query };
    for (const key in copyQuery) {
      if (key === 'currentPage' || key === 'pageSize' || key === 'total') {
        delete copyQuery[key];
      }
    }

    return copyQuery;
  }

  checkCaptcha(captcha: string) {
    return this.ctx.session.captcha?.toLowerCase() === captcha.toLowerCase();
  }

  clearCaptcha() {
    this.ctx.session.captcha = null;
    this.ctx.session.emailCaptcha = null;
  }

  verifyPrivateApi(id: string) {
    const { ctx } = this;
    if (
      ['admin', 'root'].includes(ctx.session.user?.type) &&
      ['admin', 'root'].includes(ctx.state.user?.type)
    ) {
      return;
    }

    if (id !== ctx.session.user?._id || id !== ctx.state.user?._id) {
      ctx.throw(403, 'Cannot operate other users');
    }
  }

  verifyPrivateApiByEmail(email: string) {
    const { ctx } = this;
    if (
      ['admin', 'root'].includes(ctx.session.user?.type) &&
      ['admin', 'root'].includes(ctx.state.user?.type)
    ) {
      return;
    }

    if (email !== ctx.session.user?.email || email !== ctx.state.user?.email) {
      ctx.throw(403, 'Cannot operate other users');
    }
  }
}
