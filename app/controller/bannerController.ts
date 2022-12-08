import { BannerTypeEnum } from '../typings/banner';
import BaseController from './baseController';

const bannerValidate = (action: 'update' | 'create' = 'create') => {
  const required = action === 'create';

  return {
    type: {
      type: 'enum',
      values: Object.keys(BannerTypeEnum),
      required,
    },
    url: { type: 'string', required },
    sort: { type: 'integer', required },
    link: { type: 'string', required: false },
    title: { type: 'string', required: false },
    description: { type: 'string', required: false },
    remarks: { type: 'string', required: false },
  };
};

export default class BannerController extends BaseController {
  async bannerList() {
    const { service, ctx } = this;

    ctx.body = {
      success: true,
      ...(await service.bannerService.findList(ctx.request.query)),
    };
  }

  async createBanner() {
    const { service, ctx } = this;

    ctx.validate(bannerValidate, ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.bannerService.create(ctx.request.body),
    };
  }

  async updateBanner() {
    const { service, ctx } = this;

    ctx.validate(
      {
        id: { type: 'string', required: true },
        ...bannerValidate('update'),
      },
      ctx.request.body,
    );

    ctx.body = {
      success: true,
      data: await service.bannerService.update(
        ctx.request.body.id,
        ctx.request.body,
      ),
    };
  }

  async deleteBanner() {
    const { service, ctx } = this;

    ctx.validate({ id: { type: 'string', required: true } }, ctx.request.body);

    ctx.body = {
      success: true,
      data: await service.bannerService.delete(ctx.request.body.id),
    };
  }
}
