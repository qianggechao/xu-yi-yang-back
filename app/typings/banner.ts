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

export enum BannerTypeEnum {
  home = '主页',
  stage = '现场舞台',
  music = '音乐作品',
  video = '影视作品',
  variety = '综艺作品',
  achievement = '获奖成就',
  cooperation = '合作',
}
