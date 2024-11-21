export interface IUser {
  id?:string
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
  id: string;
  email: string;
}

export interface IRequestUser {
  id: string;
  email: string;
} 