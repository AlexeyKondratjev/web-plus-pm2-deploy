import { Router } from 'express';
import {
  createCard,
  deleteCard,
  dislikeCard,
  getCards,
  likeCard
} from '../controllers/cards';
import { validationCardCreating, validationGettingCard } from '../validation/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCardCreating, createCard);
cardsRouter.delete('/:cardId', validationGettingCard, deleteCard);
cardsRouter.put('/:cardId/likes', validationGettingCard, likeCard);
cardsRouter.delete('/:cardId/likes', validationGettingCard, dislikeCard);

export default cardsRouter;
