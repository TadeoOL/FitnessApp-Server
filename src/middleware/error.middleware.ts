import { Request, Response, NextFunction } from 'express';
import { getMessage } from '../locales';
import { messages } from '../locales';

// Obtener el tipo exacto de la estructura de mensajes
type Messages = typeof messages.en;
export type MessageCategory = keyof Messages;

// Crear un tipo que mapee cada categoría a sus mensajes
type MessageKeys = {
  [K in MessageCategory]: keyof Messages[K];
};

export class HttpException extends Error {
  constructor(
    public status: number,
    public category: MessageCategory,
    public messageKey: MessageKeys[MessageCategory]
  ) {
    super(messageKey as string);
  }
}

export const createHttpError = <T extends MessageCategory>(
  status: number,
  category: T,
  messageKey: MessageKeys[T]
): HttpException => {
  return new HttpException(status, category, messageKey as any);
};

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const language = req.language || 'en';
  
  const message = getMessage(
    language,
    error.category,
    error.messageKey as keyof Messages[typeof error.category]
  );

  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware; 