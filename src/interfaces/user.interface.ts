import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  isVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IDataStoredInToken {
  id: Types.ObjectId;
  email: string;
}

export interface IRequestUser {
  id: Types.ObjectId;
  email: string;
} 