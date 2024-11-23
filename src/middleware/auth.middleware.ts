import {  Response, NextFunction, Request } from 'express';
import { Types } from 'mongoose';
import { HttpException } from './error.middleware';
import jwtService from '../services/jwt.service';

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    
    if (!authorization) {
      throw new HttpException(401, 'auth', 'TOKEN_MISSING');
    }

    const token = authorization.split('Bearer ')[1];
    
    if (!token) {
      throw new HttpException(401, 'auth', 'TOKEN_MISSING');
    }

    const decodedToken = jwtService.verifyToken(token);
    
    const userData = {
      id: new Types.ObjectId(decodedToken.id).toString(),
      email: decodedToken.email
    };
    
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'auth', 'INVALID_TOKEN'));
  }
};

export default authMiddleware; 