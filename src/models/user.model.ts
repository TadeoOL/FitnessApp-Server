import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends Omit<IUser, 'id'> , Document {
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