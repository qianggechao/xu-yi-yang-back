import { Application } from 'egg';
import banner from './router/bannr';
import UserRouter from './router/UserRouter';

export default (app: Application) => {
  banner(app);
  UserRouter(app);
};
