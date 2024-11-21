import { IRequestUser } from '../interfaces/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IRequestUser;
    }
  }
}

export {}; 