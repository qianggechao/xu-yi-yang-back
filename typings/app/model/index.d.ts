// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBannerModel from '../../../app/model/BannerModel';
import ExportMessageBoardModel from '../../../app/model/MessageBoardModel';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    BannerModel: ReturnType<typeof ExportBannerModel>;
    MessageBoardModel: ReturnType<typeof ExportMessageBoardModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
