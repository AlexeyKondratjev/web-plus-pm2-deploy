import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { DB_PATH } from './constants/constants';
import router from './routes';
import auth from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './errors/NotFoundError';
import { ErrorPatternMessages } from './utils/enums';
import { createUser, login } from './controllers/users';
import { validationLogin, validationUserCreating } from './validation/users';
import { errorLogger, requestLogger } from './middleware/logger';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationUserCreating, createUser);

app.use(auth);

app.use(router);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorPatternMessages.NOT_FOUND_BASIC));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const initDBConnect = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(DB_PATH);
    console.log('Соединение с базой данных установлено!');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}.`);
    });
  } catch (err) {
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      console.log('Возникла ошибка подключения к базе данных!');
    } else {
      console.log('Возникла ошибка запуска сервера: ', err);
    }
  }
};

initDBConnect();
