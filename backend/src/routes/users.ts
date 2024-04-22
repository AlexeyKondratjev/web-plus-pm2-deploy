import { Router } from 'express';
import {
  getUser,
  getUserInfo,
  getUsers,
  patchUserAvatar,
  patchUserProfile
} from '../controllers/users';
import {
  validationGettingUserById,
  validationPatchingUserAvatar,
  validationPatchingUserProfile
} from '../validation/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:userId', validationGettingUserById, getUser);

usersRouter.patch('/me', validationPatchingUserProfile, patchUserProfile);
usersRouter.patch('/me/avatar', validationPatchingUserAvatar, patchUserAvatar);

export default usersRouter;
