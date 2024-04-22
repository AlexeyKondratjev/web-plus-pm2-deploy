export default class Api {
  // Класс Api формирует запросы на сервер. Конструктор класса принимает объект с параметрами запроса: url и заголовки запросов.
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl,
      this._headers = headers
  }
  // Приватный метод _checkResponse проверяет ответ, полученный от сервера
  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  // Метод getProfileData возвращает запрос на сервер для получения данных пользователя
  getProfileData() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
      })
      .then(this._checkResponse)
  }
  // Метод getInitialCards возвращает запрос на сервер для получения массива карточек с фотографиями
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers,
      })
      .then(this._checkResponse)
  }
  // Метод editProfileData возвращает запрос на сервер, изменяющий данные пользователя
  editProfileData(profileData) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(profileData)
      })
      .then(this._checkResponse);
  }
  // Метод  editAvatarData возвращает запрос на сервер, изменяющий аватар пользователя
  editAvatarData(avatarData) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(avatarData)
      })
      .then(this._checkResponse);
  }
  // Метод addNewCard возвращает запрос на сервер, добавляющий карточку в массив уже существующих. Метод принимает и передает в запросе на сервер данные карточки, введеные пользователем: описание и url
  addNewCard(cardData) {
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(cardData)
      })
      .then(this._checkResponse)
  }
  // Метод removeCard возвращает запрос на сервер, добавляющий карточку в массив уже существующих. Метод принимает и передает в запросе на сервер id удаляемой карточки
  removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }
 // Метод changeLikesData возвращает запрос на сервер, который поставит или снимет Like с карточки. Метод принимает id карточки и "POST" или "DELETE" в качестве метода запроса
  changeLikesData(cardId, queryMethod) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: queryMethod,
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}
