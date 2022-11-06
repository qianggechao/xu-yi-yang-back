import BaseController from './baseController';

export default class MessageBoardModelController extends BaseController {
  async list() {
    const { ctx, service } = this;

    const page = this.getPage(ctx.request.query);
    const query = this.filterPage(ctx.request.query);

    ctx.body = {
      success: true,
      ...(await service.messageBoardService.findList(query, page)),
    };
  }

  async create() {
    const { ctx, service } = this;
    ctx.body = {
      success: true,
      ...(await service.messageBoardService.create(ctx.request.body)),
    };
  }
}
