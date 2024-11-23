import { Request } from 'express';
import { Language } from './common.types';

export interface RequestWithLanguage extends Request {
  language: Language;
} 