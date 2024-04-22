import mongoose, { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { ICustomRequest } from '../utils/types';
import { ErrorPatternMessages, HttpResponseStatusCodes } from '../utils/enums';
import { BadRequestError } from '../errors/BadRequestError';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundError } from '../errors/NotFoundError';
import { ForbiddenError } from '../errors/ForbiddenError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    return res.status(HttpResponseStatusCodes.OK).send(cards);
  } catch (err) {
    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const createCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const owner = req.user?._id;
    const createdCard = await Card.create({ name, link, owner });

    return res.status(HttpResponseStatusCodes.CREATED).send(createdCard);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_CREATE} карточки!`));
    }

    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const deleteCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user?._id;
    const deletedCard = await Card.findById(cardId).orFail();

    if (deletedCard.owner.toString() !== userId) {
      return next(new ForbiddenError(`${ErrorPatternMessages.FORBIDDEN_DELETE} чужой карточки!`));
    }

    await Card.findByIdAndDelete(cardId).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(deletedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_DELETE} карточки!`));
    }

    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const likeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const ownerId = req.user?._id;
    const patchedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: ownerId } },
      { new: true }
    ).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} карточки!`));
    }

    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};

export const dislikeCard = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const ownerId = req.user?._id as ObjectId;
    const patchedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: ownerId } },
      { new: true }
    ).orFail();

    return res.status(HttpResponseStatusCodes.OK).send(patchedCard);
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(`${ErrorPatternMessages.NOT_FOUND_BY_ID} карточку!`));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(`${ErrorPatternMessages.BAD_REQUEST_UPDATE} карточки!`));
    }

    return next(new InternalServerError(ErrorPatternMessages.SERVER_ERROR));
  }
};
