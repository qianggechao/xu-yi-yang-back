import { Application } from 'egg';
import BannerRouter from './router/BannerRouter';
import MessageBoradRouter from './router/MessageBoradRouter';
import UserRouter from './router/UserRouter';

export default (app: Application) => {
  BannerRouter(app);
  UserRouter(app);
  MessageBoradRouter(app);
};
