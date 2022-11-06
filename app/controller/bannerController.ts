import BaseController from './baseController';

export default class BannerController extends BaseController {
  public async list() {
    const { service, ctx } = this;
    ctx.body = {
      success: true,
      ...(await service.bannerService.findList(ctx.request.query)),
    };
  }

  public async create() {
    // const { service, ctx } = this;
    // this.setBody(service.bannerService.create, ctx.request.body);
  }
}
