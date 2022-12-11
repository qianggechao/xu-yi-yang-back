import { BaseDocument } from '.';

export interface ArticleType extends BaseDocument {
  title: string;
  content: string;
  type: string;
  description?: string;
  cover?: string;
}

export enum ArticleTypeEnum {
  common = '普通文章',
  person = '个人文章',
  news = '新闻',
  rules = '条例',
}
