import { Joi, celebrate } from 'celebrate';
import regularExp from '../utils/regularExp';

export const validationUserCreating = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regularExp),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

export const validationGettingUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  })
});

export const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

export const validationPatchingUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required()
  })
});

export const validationPatchingUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regularExp).required()
  })
});
