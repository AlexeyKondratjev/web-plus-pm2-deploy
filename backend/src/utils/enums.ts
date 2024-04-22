export enum HttpResponseStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  AUTH_ERROR = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export enum ErrorPatternMessages {
  BAD_REQUEST_SEARCH = 'Переданы некорректные данные при поиске',
  BAD_REQUEST_CREATE = 'Переданы некорректные данные при создании',
  BAD_REQUEST_DELETE = 'Переданы некорректные данные при удалении',
  BAD_REQUEST_UPDATE = 'Переданы некорректные данные при обновлении данных',
  AUTH_ERROR = 'Необходима авторизация',
  AUTH_ERROR_WRONG_DATA = 'Неправильные почта или пароль',
  FORBIDDEN_DELETE = 'Недостаточно прав для удаления',
  NOT_FOUND_BASIC = 'Запрашиваемый ресурс не найден',
  NOT_FOUND_BY_ID = 'По указанному id не удалось найти',
  CONFLICT = 'Пользователь с данным email уже существует',
  SERVER_ERROR = 'На сервере произошла ошибка'
}
