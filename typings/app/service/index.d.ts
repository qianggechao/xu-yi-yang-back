// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticleService from '../../../app/service/ArticleService';
import ExportBannerService from '../../../app/service/BannerService';
import ExportMessageBoardService from '../../../app/service/MessageBoardService';
import ExportMusicService from '../../../app/service/MusicService';
import ExportStageService from '../../../app/service/StageService';
import ExportTest from '../../../app/service/Test';
import ExportUserService from '../../../app/service/UserService';

declare module 'egg' {
  interface IService {
    articleService: AutoInstanceType<typeof ExportArticleService>;
    bannerService: AutoInstanceType<typeof ExportBannerService>;
    messageBoardService: AutoInstanceType<typeof ExportMessageBoardService>;
    musicService: AutoInstanceType<typeof ExportMusicService>;
    stageService: AutoInstanceType<typeof ExportStageService>;
    test: AutoInstanceType<typeof ExportTest>;
    userService: AutoInstanceType<typeof ExportUserService>;
  }
}
