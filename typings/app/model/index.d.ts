// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticleModel from '../../../app/model/ArticleModel';
import ExportBannerModel from '../../../app/model/BannerModel';
import ExportMessageBoardModel from '../../../app/model/MessageBoardModel';
import ExportMusicModel from '../../../app/model/MusicModel';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    ArticleModel: ReturnType<typeof ExportArticleModel>;
    BannerModel: ReturnType<typeof ExportBannerModel>;
    MessageBoardModel: ReturnType<typeof ExportMessageBoardModel>;
    MusicModel: ReturnType<typeof ExportMusicModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
