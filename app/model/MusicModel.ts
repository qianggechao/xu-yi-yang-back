import { Application } from 'egg';
import { MusicType, MusicTypeEnum } from '../typings/music';

const MusicModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const musicBaseSchema = {
    name: { type: String, require: true },
    type: {
      type: String,
      require: true,
      enum: Object.keys(MusicTypeEnum),
    },
    url: { type: String, require: true },
    description: String,
    link: String,
    lyric: String,
    cover: String,
    avatar: String,
    start: {
      count: { type: Number, default: 0 },
      isStart: { type: Boolean, default: false },
      userIds: [
        {
          type: String,
          require: false,
          _id: { type: mongoose.Types.ObjectId, unique: true },
        },
      ],
    },
    like: {
      count: { type: Number, default: 0 },
      isLike: { type: Boolean, default: false },
      userIds: [
        {
          type: String,
          require: false,
          _id: { type: mongoose.Types.ObjectId, ref: 'User', unique: true },
        },
      ],
    },
    message: {
      count: { type: Number, default: 0 },
      data: [
        {
          _id: { type: mongoose.Types.ObjectId, require: true },
          content: { type: String, require: true },
          user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
        },
      ],
    },
  };

  const MusicSchema = new Schema(
    {
      ...musicBaseSchema,
      children: [musicBaseSchema],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<MusicType>('Music', MusicSchema);
};

export default MusicModel;
