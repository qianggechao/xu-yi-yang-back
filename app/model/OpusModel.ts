import { Application } from 'egg';
import { OpusType, OpusTypeEnum } from '../typings/opus';

const OpusModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OpusSchema = new Schema(
    {
      name: { type: String, require: true },
      type: { type: String, enum: Object.keys(OpusTypeEnum), require: true },
      tag: String,
      cover: String,
      url: String,
      description: String,
      link: String,
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<OpusType>('Opus', OpusSchema);
};

export default OpusModel;
