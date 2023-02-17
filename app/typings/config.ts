import { BaseDocument } from '.';

export interface ConfigType extends BaseDocument {
  title: string;
  description?: string;
  content?: string;
  author?: string;
  copyright?: string;
  email?: string;
  links?: {
    title: string;
    data: { icon: string; name: string; link: string };
  }[];
}
