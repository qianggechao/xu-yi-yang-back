import { Application } from 'egg';
import { EnumType } from '../typings/enum';

const EnumModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const EnumSchema = new Schema(
    {
      options: [
        {
          label: { type: String, required: true },
          value: { type: mongoose.Types.ObjectId, required: true },
        },
      ],
      name: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
  );

  return mongoose.model<EnumType>('enum', EnumSchema);
};

export default EnumModel;
