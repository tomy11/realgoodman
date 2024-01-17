import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

@Schema()
export class Upload {
  @Prop()
  originalname: string;

  @Prop()
  filename: string;

  @Prop()
  fieldname: string;

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  destination: string;

  @Prop()
  path: string;

  @Prop()
  size: string;

  @Prop()
  user: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
