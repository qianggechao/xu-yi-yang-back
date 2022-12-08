import { Document } from 'mongoose';

export interface EnumType extends Document {
  options: {
    label: string;
    value: string;
  };
  name: string;
}
