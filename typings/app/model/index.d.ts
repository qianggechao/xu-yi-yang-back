// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBannerModel from '../../../app/model/BannerModel';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    BannerModel: ReturnType<typeof ExportBannerModel>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
