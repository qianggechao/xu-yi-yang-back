/// <reference types="mongoose" />
import { Application } from 'egg';
import { UserType } from '../typings/user';
declare const UserSchemaType: {
    nickName: {
        type: StringConstructor;
        required: boolean;
    };
    email: {
        type: StringConstructor;
        required: boolean;
    };
    password: {
        type: StringConstructor;
        required: boolean;
    };
    avator: {
        type: StringConstructor;
    };
    brief: {
        type: StringConstructor;
    };
};
declare const UserModel: (app: Application) => import("mongoose").Model<UserType, {}, {}>;
export { UserSchemaType };
export default UserModel;
