import { Application } from 'egg';
import { EnumType } from '../typings/enum';

const EnumMode = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const EnumSchema = new Schema(
    {
      name: { type: String, required: true },
      enums: [
        {
          label: { type: String, required: true },
          value: { type: mongoose.Types.ObjectId, required: true, auto: true },
        },
      ],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<EnumType>('Enum', EnumSchema);
};

export default EnumMode;
