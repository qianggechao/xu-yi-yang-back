// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBanner from '../../../app/model/Banner';

declare module 'egg' {
  interface IModel {
    Banner: ReturnType<typeof ExportBanner>;
  }
}
