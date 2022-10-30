import { Document } from 'mongoose';
import { UserType } from './user';
export interface MessageBoardType extends Document {
    user: UserType;
    content: string;
}
