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
}
