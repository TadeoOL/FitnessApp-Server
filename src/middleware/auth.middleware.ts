import { Request, Response, NextFunction } from 'express';
import { HttpException } from './error.middleware';
import jwtService from '../services/jwt.service';
import { IRequestUser } from '../interfaces/user.interface';

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization = req.headers.authorization;
    
    if (!authorization) {
      throw new HttpException(401, 'Authentication token missing');
    }

    const token = authorization.split('Bearer ')[1];
    
    if (!token) {
      throw new HttpException(401, 'Authentication token missing');
    }

    const decodedToken = jwtService.verifyToken(token);
    
    // Create a RequestUser object from the decoded token
    const userData: IRequestUser = {
      id: decodedToken.id,
      email: decodedToken.email
    };
    
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'Invalid authentication token'));
  }
};

export default authMiddleware; 