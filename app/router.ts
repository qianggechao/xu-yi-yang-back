import { Application } from 'egg';
import BannerRouter from './router/BannerRouter';
import UserRouter from './router/UserRouter';

export default (app: Application) => {
  BannerRouter(app);
  UserRouter(app);
};
