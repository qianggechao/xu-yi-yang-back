import { Application } from 'egg';
import { BannerType } from '../typings/banner';

const BannerModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      type: { type: String, required: true },
      link: { type: String, required: true },
      url: { type: String, required: true },
      sort: { type: Number, required: true, unique: true },
      remarks: { type: String },
    },
    { timestamps: true },
  );

  return mongoose.model<BannerType>('Banner', BannerSchema);
};

export default BannerModel;
