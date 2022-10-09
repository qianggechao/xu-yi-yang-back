// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportVerifyToken from '../../../app/middleware/verifyToken';

declare module 'egg' {
  interface IMiddleware {
    verifyToken: typeof ExportVerifyToken;
  }
}
