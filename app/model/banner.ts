import { Application } from 'egg';
import { ObjectId } from 'mongoose';

interface BannerType {
  id: ObjectId;
  title: string;
  description: string;
  ype: string;
  link: string;
  url: string;
  sort: number;
  remarks?: string;
}

module.exports = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema<BannerType>(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      type: { type: String, required: true },
      link: { type: String, required: true },
      url: { type: String, required: true },
      sort: { type: Number, required: true, unique: true },
      remarks: { type: String },
    },
    { timestamps: true }
  );

  return mongoose.model<BannerType>('Banner', BannerSchema);
};

// {app_root}/app/controller/user.js
// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.BannerSchema.find({});
// };
