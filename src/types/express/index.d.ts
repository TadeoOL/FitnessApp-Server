import mongoose from 'mongoose';
import { Language } from '../common.types';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
      };
      language?: Language;
    }
  }
}

export {};