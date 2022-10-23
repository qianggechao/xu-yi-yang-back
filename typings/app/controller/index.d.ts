// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBannerController from '../../../app/controller/bannerController';
import ExportBaseController from '../../../app/controller/baseController';
import ExportHome from '../../../app/controller/home';
import ExportUserController from '../../../app/controller/userController';

declare module 'egg' {
  interface IController {
    bannerController: ExportBannerController;
    baseController: ExportBaseController;
    home: ExportHome;
    userController: ExportUserController;
  }
}
