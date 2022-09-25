import { Service } from 'egg';

/**
 * Banner Service
 */
export default class Banner extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async find() {
    // 没提示
    this.ctx.model.Banner.find({ title: 'nam' });
  }
}
