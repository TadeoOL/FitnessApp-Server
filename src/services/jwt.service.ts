import jwt from 'jsonwebtoken';
import config from '../config/environment';
import { IUser, IDataStoredInToken, ITokenData } from '../interfaces/user.interface';
import { User } from '../models/entities/user.model';
import { DocumentType } from '@typegoose/typegoose';

export class JwtService {
  public generateToken(user: DocumentType<User>): ITokenData {
    const dataStoredInToken: IDataStoredInToken = {
      id: user._id ,
      email: user.email
    };

    const expiresIn = 60 * 60 * 24;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, config.jwtSecret, { expiresIn })
    };
  }

  public verifyToken(token: string): IDataStoredInToken {
    return jwt.verify(token, config.jwtSecret) as IDataStoredInToken;
  }
}

export default new JwtService(); 