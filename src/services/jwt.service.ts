import jwt from 'jsonwebtoken';
import config from '../config/environment';
import { IUser, IDataStoredInToken, ITokenData } from '../interfaces/user.interface';

export class JwtService {
  public generateToken(user: IUser): ITokenData {
    const dataStoredInToken: IDataStoredInToken = {
      id: user._id,
      email: user.email
    };

    const expiresIn = 60 * 60 * 24; // 24 hours

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