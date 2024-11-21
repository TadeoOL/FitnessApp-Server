import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends Omit<IUser, '_id'> , Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date
}, {
  timestamps: true
});

export default mongoose.model<IUserDocument>('User', UserSchema); 