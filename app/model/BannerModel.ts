import { Application } from 'egg';
import { BannerType, BannerTypeEnum } from '../typings/banner';

const BannerModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema(
    {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      type: {
        type: String,
        enum: Object.keys(BannerTypeEnum),
        required: true,
      },
      link: { type: String },
      url: { type: String, required: true },
      sort: { type: Number, required: true, unique: true },
      remarks: { type: String, default: '' },
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<BannerType>('Banner', BannerSchema);
};

export default BannerModel;
