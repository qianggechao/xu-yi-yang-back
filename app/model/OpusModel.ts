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
      star: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          require: false,
          unique: true,
        },
      ],
      like: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          require: false,
          unique: true,
        },
      ],
      messages: [
        {
          _id: { type: mongoose.Types.ObjectId, require: true, auto: true },
          content: { type: String, require: true },
          user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
        },
      ],
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<OpusType>('Opus', OpusSchema);
};

export default OpusModel;
