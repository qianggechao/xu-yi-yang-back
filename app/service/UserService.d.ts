import { UserType } from './../typings/user';
import { Service } from 'egg';
import { FilterQuery } from 'mongoose';
export default class UserService extends Service {
    formatUserInfo(info: UserType | null): UserType | null;
    findUserByEmail(email: string): Promise<UserType | null>;
    findById(id: string): Promise<UserType | null>;
    createUser(userInfo: UserType): Promise<UserType>;
    findBy(filter?: FilterQuery<UserType>): Promise<UserType[]>;
    findOne(filter: FilterQuery<UserType>): Promise<UserType | null>;
}
