// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBanner from '../../../app/controller/banner';
import ExportHome from '../../../app/controller/home';
import ExportUserController from '../../../app/controller/userController';

declare module 'egg' {
  interface IController {
    banner: ExportBanner;
    home: ExportHome;
    userController: ExportUserController;
  }
}
