export default class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, selector) {
    this._title = data.title;
    this._imageSrc = data.imageSrc;
    this._id = data.id;
    this._likesArray = data.likesArray;
    this._cardOwnerId = data.cardOwnerId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._selector = selector;
  }

  //Метод _getElementMarkup получает шаблон элемента "карточки места" из HTML-разметки
  //и возвращает клон соотв. узла DOM.
  _getElementMarkup() {
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  }

  //Метод _isLikedByCurrentUser принимает на вход параметр currentUserId (уникальный идентификатор текущего пользователя).
  //Возвращает true, если текущий пользователь есть среди пользователей, лайкнувших данную карточку, иначе - false.
  _isLikedByCurrentUser(currentUserId) {
    return this._likesArray.some((arrItem) => {
      return arrItem._id === currentUserId;
    });
  }

  //Метод _currentUserIsOwner проверяет факт того, является ли текущий пользователь - владельцем данной карточки.
  //Принимает на вход параметр currentUserId (уникальный идентификатор текущего пользователя).
  //Возвращает true, если является, иначе - false.
  _currentUserIsOwner(currentUserId) {
    return this._cardOwnerId === currentUserId;
  }

  //Метод _setEventListeners задает обработчики событий интерактивным элементам, присутствующим на карточке.
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardLikeButton.addEventListener('click', () => {
      //this._cardLikeButton.classList.toggle('like-button_active');

      //Определяем метод запроса (что будем делать с лайками - добавлять, или удалять).
      const queryMethod = this._cardLikeButton.classList.contains('like-button_active') ? 'DELETE' : 'PUT';

      //Изменяем информацию о лайках.
      this._handleLikeClick(queryMethod);
    });

    const cardDeleteButton = this._element.querySelector('.card__delete-button');

    if (cardDeleteButton) {
      cardDeleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      });
    };
  }

  //Метод renderLikesCount отрисовывает значение количества лайков карточки в соотв. элементе.
  renderLikesCount(likesCount) {
    this._likesCountElement.textContent = likesCount;
  }

  //Метод toggleLikeButtonActivity переключает активность кнопки лайка на обратное значение.
  toggleLikeButtonActivity() {
    this._cardLikeButton.classList.toggle('like-button_active');
  }

  generateCard(currentUserId) {
    this._element = this._getElementMarkup();

    this._likesCountElement = this._element.querySelector('.card__likes-count');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLikeButton = this._element.querySelector('.card__like-button');

    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage.src = this._imageSrc;
    this._cardImage.alt = this._title;
    this._element.id = this._id;

    //Задаем состояние кнопки лайка (лайкнул ли карточку текущий пользователь) и количество лайков в целом.
    if (this._isLikedByCurrentUser(currentUserId)) {
      this._cardLikeButton.classList.add('like-button_active');
    } else {
      this._cardLikeButton.classList.remove('like-button_active');
    };

    this._element.querySelector('.card__likes-count').textContent = this._likesArray.length;

    //Определяем наличие кнопки удаления карточки (по условию: удалять можно только свои карточки).
    if (!this._currentUserIsOwner(currentUserId)) {
      this._element.querySelector('.card__delete-button').remove();
    };

    //Устанавливаем обработчики событий для активных элементов карточки.
    this._setEventListeners();

    return this._element;
  }
}
