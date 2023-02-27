import { Subscription } from 'egg';

export default class ClearCaptcha extends Subscription {
  static get schedule() {
    return {
      interval: '60m',
      type: 'worker',
    };
  }

  async subscribe() {
    // this.ctx.state.captcha = null;
    // this.logger.info('schedule: clear captcha');
  }
}
