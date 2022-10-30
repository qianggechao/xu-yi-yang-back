import { Document } from 'mongoose';
export interface BannerType extends Document {
    title: string;
    description: string;
    type: string;
    link: string;
    url: string;
    sort: number;
    remarks?: string;
}
