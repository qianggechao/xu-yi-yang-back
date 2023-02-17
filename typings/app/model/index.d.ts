// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticleModel from '../../../app/model/ArticleModel';
import ExportBannerModel from '../../../app/model/BannerModel';
import ExportConfigMode from '../../../app/model/ConfigMode';
import ExportEnumMode from '../../../app/model/EnumMode';
import ExportMessageBoardModel from '../../../app/model/MessageBoardModel';
import ExportMusicModel from '../../../app/model/MusicModel';
import ExportOpusModel from '../../../app/model/OpusModel';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    ArticleModel: ReturnType<typeof ExportArticleModel>;
    BannerModel: ReturnType<typeof ExportBannerModel>;
    ConfigMode: ReturnType<typeof ExportConfigMode>;
    EnumMode: ReturnType<typeof ExportEnumMode>;
    MessageBoardModel: ReturnType<typeof ExportMessageBoardModel>;
    MusicModel: ReturnType<typeof ExportMusicModel>;
    OpusModel: ReturnType<typeof ExportOpusModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
