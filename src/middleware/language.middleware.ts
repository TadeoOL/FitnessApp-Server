import { Response, NextFunction, Request } from 'express';
import { Language } from '../types/common.types';

export const languageMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const langHeader = req.headers['x-custom-language'] as Language;
  const acceptLanguage = req.headers['accept-language'];
  const DEFAULT_LANGUAGE: Language = 'es';
  
  const isValidLanguage = (lang: string): lang is Language => 
    ['en', 'es'].includes(lang);
  
  let selectedLanguage: Language = DEFAULT_LANGUAGE;
  
  if (langHeader && isValidLanguage(langHeader)) {
    selectedLanguage = langHeader;
  } else if (acceptLanguage?.includes('es')) {
    selectedLanguage = 'es';
  }
  
  req.language = selectedLanguage;
  next();
};