import { Application } from 'egg';
import { StageType, StageTypeEnum } from '../typings/stage';

const StageModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StageSchema = new Schema(
    {
      name: { type: String, require: true },
      type: { type: String, enum: Object.keys(StageTypeEnum), require: true },
      cover: { type: String, require: true },
      url: String,
      description: String,
      link: String,
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<StageType>('Stage', StageSchema);
};

export default StageModel;
