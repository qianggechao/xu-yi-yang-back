/// <reference types="mongoose" />
import { Application } from 'egg';
import { BannerType } from '../typings/banner';
declare const BannerModel: (app: Application) => import("mongoose").Model<BannerType, {}, {}>;
export default BannerModel;
