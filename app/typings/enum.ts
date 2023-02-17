import { BaseDocument } from '.';

export interface EnumType extends BaseDocument {
  name: string;
  enums: [{ label: string; value: string }];
}
