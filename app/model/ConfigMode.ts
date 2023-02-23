import { Application } from 'egg';
import { ConfigType } from '../typings/config';

const ConfigMode = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConfigSchema = new Schema(
    {
      title: { type: String, required: true, unique: true },
      description: String,
      content: String,
      author: String,
      copyright: String,
      email: String,
      links: [
        {
          title: { type: String, required: true },
          name: { type: String, required: true },
          link: { type: String, required: true },
          icon: String,
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<ConfigType>('Config', ConfigSchema);
};

export default ConfigMode;
