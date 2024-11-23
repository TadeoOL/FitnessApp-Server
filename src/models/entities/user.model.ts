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

  @prop({
    type: String,
    enum: ['es', 'en'],
    default: 'en'
  })
  language!: string;
}

export const UserModel = getModelForClass(User); 