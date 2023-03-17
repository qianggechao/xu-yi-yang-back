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
    author: String,
    tag: [
      {
        _id: { type: mongoose.Types.ObjectId, auto: true },
        color: { type: String, require: true },
        text: { type: String, unique: true, require: true },
      },
    ],
    link: String,
    lyric: String,
    cover: String,
    avatar: String,
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
