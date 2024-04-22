import { Request } from 'express';
import { Schema } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import { InternalServerError } from '../errors/InternalServerError';

export interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string
}

export interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: [Schema.Types.ObjectId],
  createdAt: Date
}

export interface ICustomRequest extends Request {
  user?: {
    _id: string | JwtPayload;
  }
}

export type TError = BadRequestError | NotFoundError | InternalServerError;
