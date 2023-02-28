import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log('session', ctx.session);
    console.log('state', ctx.state);
    ctx.body = 'hello';
  }
}
