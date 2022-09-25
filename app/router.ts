import { Application } from 'egg';
import banner from './router/bannr';

export default (app: Application) => {
  banner(app);
};
