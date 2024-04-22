import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ICustomRequest } from '../utils/types';
import { AuthError } from '../errors/AuthError';
import { ErrorPatternMessages } from '../utils/enums';

const auth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(ErrorPatternMessages.AUTH_ERROR));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthError(ErrorPatternMessages.AUTH_ERROR));
  }

  req.user = payload as { _id: JwtPayload };

  return next();
};

export default auth;
