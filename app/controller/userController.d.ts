import { Controller } from 'egg';
export default class UserController extends Controller {
    userInfo(): Promise<void>;
    encryptPassword(password: string): string;
    userList(): Promise<void>;
    createUser(): Promise<void>;
    loginUser(): Promise<void>;
}
