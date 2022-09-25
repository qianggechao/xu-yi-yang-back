import { Controller } from 'egg';

export default class BannerController extends Controller {
  public async list() {
    const { ctx } = this;
    ctx.body = await ctx.model.Banner.find();
  }
}
