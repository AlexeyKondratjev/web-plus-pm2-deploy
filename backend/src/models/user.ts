import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../utils/types';
import { AuthError } from '../errors/AuthError';
import { ErrorPatternMessages } from '../utils/enums';

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) =>
    Promise<mongoose.Document<unknown, any, IUser>>
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа.'],
    maxlength: [30, 'Максимальная длина 30 символов.'],
    required: false,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа.'],
    maxlength: [200, 'Максимальная длина 200 символов.'],
    required: false,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.static('findUserByCredentials', async function findUserByCredentials(email: string, password: string) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    return Promise.reject(new AuthError(ErrorPatternMessages.AUTH_ERROR));
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return Promise.reject(new AuthError(ErrorPatternMessages.AUTH_ERROR));
  }

  return user;
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
