/// <reference types="mongoose" />
import { Application } from 'egg';
import { MessageBoardType } from '../typings/messageBoard';
declare const MessageBoardModel: (app: Application) => import("mongoose").Model<MessageBoardType, {}, {}>;
export default MessageBoardModel;
