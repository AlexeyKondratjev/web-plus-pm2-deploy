import { Joi, celebrate } from 'celebrate';
import regularExp from '../utils/regularExp';

export const validationGettingCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
  })
});

export const validationCardCreating = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regularExp)
  })
});
