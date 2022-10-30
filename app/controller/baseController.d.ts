import { Controller } from 'egg';
export default class BaseController extends Controller {
    get user(): any;
    setBody<R>(service: Promise<R>): Promise<void>;
    failed(message: string): void;
    notFound(msg: string): void;
}
