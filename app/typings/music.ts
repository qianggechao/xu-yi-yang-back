import { BaseDocument } from '.';
import { UserType } from './user';

export enum MusicTypeEnum {
  album = '专辑',
  mv = 'mv',
  episode = '插曲',
  cooperation = '合作',
  master = '主要作品',
}

export interface MusicType extends BaseDocument {
  name: string;
  type: keyof typeof MusicTypeEnum;
  description?: string;
  url?: string;
  link?: string;
  lyric?: string;
  cover?: string;
  avatar?: string;
  start?: number;
  like?: {
    count: number;
    exist: boolean;
    userIds: string[];
  };
  message?: {
    count: number;
    data: {
      _id: string;
      user: UserType;
      content: string;
    }[];
  };
  children: MusicType[];
}
