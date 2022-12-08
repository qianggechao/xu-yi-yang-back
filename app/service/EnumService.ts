import { Service } from 'egg';

export default class EnumService extends Service {
  async create(name: string, label: string) {
    return this.ctx.model.EnumModel.create({
      name,
      $set: { options: { label } },
    });
  }

  async update(label: string, value: string) {
    const filter = { 'options.$.value': value };

    return this.ctx.model.EnumModel.findOneAndUpdate(filter, { label });
  }

  async delete(value: string) {
    const filter = { 'options.$.value': value };
    return this.ctx.model.EnumModel.findOneAndUpdate(filter, {
      $pull: { value },
    });
  }
}
