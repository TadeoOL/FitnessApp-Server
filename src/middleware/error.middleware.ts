import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

const errorMiddleware = (
  error: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware; 