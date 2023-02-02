import { Application } from 'egg';
import ArticleRouter from './router/ArticleRouter';
import BannerRouter from './router/BannerRouter';
import MessageBoardRouter from './router/MessageBoardRouter';
import MusicRouter from './router/MusicRouter';
import OpusRouter from './router/OpusRouter';
import UserRouter from './router/UserRouter';

export default (app: Application) => {
  BannerRouter(app);
  UserRouter(app);
  MessageBoardRouter(app);
  ArticleRouter(app);
  MusicRouter(app);
  OpusRouter(app);
};
