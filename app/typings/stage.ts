import { BaseDocument } from '.';

export enum StageTypeEnum {
  site = '现场舞台',
  create = '创造营舞台',
}

export interface StageType extends BaseDocument {
  name: string;
  type: keyof typeof StageTypeEnum;
  cover: string;
  url: string;
  description: string;
  link: string;
}
