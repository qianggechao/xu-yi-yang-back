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
}
