import BaseController from './baseController';
export default class BannerController extends BaseController {
    list(): Promise<void>;
    create(): Promise<void>;
}
