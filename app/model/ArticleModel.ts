import { Application } from 'egg';
import { ArticleType, ArticleTypeEnum } from '../typings/Article';

const ArticleModel = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema(
    {
      title: { type: String, required: true, unique: true },
      content: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: Object.keys(ArticleTypeEnum),
      },
      description: String,
      cover: String,
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  return mongoose.model<ArticleType>('Article', ArticleSchema);
};

export default ArticleModel;
