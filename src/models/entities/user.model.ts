import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseModel } from '../base.model';

export class User extends BaseModel {
  @prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true })
  name!: string;

  @prop({ default: false })
  isVerified!: boolean;

  @prop()
  verificationToken?: string;

  @prop()
  verificationTokenExpires?: Date;
}

export const UserModel = getModelForClass(User); 