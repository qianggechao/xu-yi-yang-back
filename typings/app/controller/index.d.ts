// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticleController from '../../../app/controller/articleController';
import ExportBannerController from '../../../app/controller/bannerController';
import ExportBaseController from '../../../app/controller/baseController';
import ExportHome from '../../../app/controller/home';
import ExportMessageBoardController from '../../../app/controller/messageBoardController';
import ExportMusicController from '../../../app/controller/MusicController';
import ExportUserController from '../../../app/controller/userController';

declare module 'egg' {
  interface IController {
    articleController: ExportArticleController;
    bannerController: ExportBannerController;
    baseController: ExportBaseController;
    home: ExportHome;
    messageBoardController: ExportMessageBoardController;
    musicController: ExportMusicController;
    userController: ExportUserController;
  }
}
