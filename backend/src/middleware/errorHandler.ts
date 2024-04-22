import { NextFunction, Request, Response } from 'express';
import { TError } from '../utils/types';

export const errorHandler = (
  err: TError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка!' : message });
};
