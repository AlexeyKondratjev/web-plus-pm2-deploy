import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDelSubmit) {
    super(popupSelector);
    this._handleSubmit = handleDelSubmit;
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  }

  setEventListeners() {
    // Метод setEventListeners перезаписывает родительский метод setEventListeners, добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы. Добавляет слушатель события submit.
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleSubmit);
  }
}
