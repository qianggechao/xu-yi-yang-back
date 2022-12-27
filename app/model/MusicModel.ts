import { Application } from 'egg';
import { MusicType, MusicTypeEnum } from '../typings/music';

const MusicModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MusicSchema = new Schema(
    {
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
        userIds: [
          {
            type: String,
            require: false,
            _id: { type: mongoose.Types.ObjectId, unique: true },
          },
        ],
      },
      messages: {
        count: { type: Number, default: 0 },
        data: [
          {
            _id: mongoose.Types.ObjectId,
            content: { type: String, require: true },
            user: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
          },
        ],
      },
      children: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Music',
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<MusicType>('Music', MusicSchema);
};

export default MusicModel;
