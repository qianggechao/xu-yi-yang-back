// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBanner from '../../../app/model/Banner';
import ExportUserModel from '../../../app/model/UserModel';

declare module 'egg' {
  interface IModel {
    Banner: ReturnType<typeof ExportBanner>;
    UserModel: ReturnType<typeof ExportUserModel>;
  }
}
