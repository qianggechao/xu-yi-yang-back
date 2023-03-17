import { Service } from 'egg';

export default class EnumService extends Service {
  async create(name: string, label: string) {
    return this.ctx.model.EnumMode.create({ name, enums: { label } });
  }

  async addEnum(id: string, name: string, label: string) {
    const unique = await this.ctx.model.EnumMode.findOne({
      _id: id,
      'enums.label': label,
    });

    if (unique) {
      return new Error('枚举重复');
    }

    return this.ctx.model.EnumMode.findByIdAndUpdate(id, {
      name,
      $push: { 'enums.$.label': label },
    });
  }

  async delete(id: string, value: string) {
    return this.ctx.model.EnumMode.findOneAndDelete({
      _id: id,
      'enums.value': value,
    });
  }
}
