import BaseController from './baseController';

export default class MessageBoardModelController extends BaseController {
  findLlist() {
    const { ctx, service } = this;
    this.setBody(service.messageBoardService.findList(ctx.request.query));
  }

  create() {
    const { ctx, service } = this;
    this.setBody(service.messageBoardService.create(ctx.request.body));
  }
}
