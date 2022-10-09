// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUserModel from '../../../app/model/UserModel';
import ExportBanner from '../../../app/model/banner';

declare module 'egg' {
  interface IModel {
    UserModel: ReturnType<typeof ExportUserModel>;
    Banner: ReturnType<typeof ExportBanner>;
  }
}
