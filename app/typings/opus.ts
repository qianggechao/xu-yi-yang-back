import { BaseDocument } from '.';

export enum OpusTypeEnum {
  stage = '现场舞台',
  variety = '综艺作品',
  film = '影视作品',
  cooperation = '合作',
  achievement = '获奖成就',
}

export interface OpusType extends BaseDocument {
  name: string;
  type: keyof typeof OpusTypeEnum;
  cover: string;
  url?: string;
  description?: string;
  link?: string;
}
