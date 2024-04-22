import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleFormPrefill) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormPrefill = handleFormPrefill;
    this._inputList = this._popup.querySelectorAll('.form__item');
    this._form = this._popup.querySelector('.popup__form');
    this._formValues = {};
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  }

  _getInputValues() {
    //собирает данные всех полей формы.
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(data) {
    // Вставляет данные в поля формы при открытии попапа

    this._inputList.forEach( (input) => {
      input.value = data[input.name];
    } )
  }

  setEventListeners() {
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    super.setEventListeners();
    this._popup.addEventListener('submit', this.submitHandler.bind(this));
  }

  close() {
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    super.close();
    this._form.reset();
  }

  submitHandler(evt) {
    const inputsValue = this._getInputValues();
    this._handleFormSubmit(evt, inputsValue);
  }

  prefillForm() {
    this._handleFormPrefill();
  }
}
