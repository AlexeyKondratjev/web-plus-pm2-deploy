export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //Метод _hasInvalidInput возвращает true в случае, если хотя бы одно поле из массива полей не валидно.
  //В противном случае - возвращает false.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Метод _toggleButtonState в зависимости от валидности полей делает кнопку активной, либо нет.
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  //Метод _showInputError принимает на вход параметр inputElement (поле ввода).
  //Стилизует данное поле ввода для отображения наличия ошибки, а также стилизует элемент отображения сообщения об ошибке и
  //задает ему соответствующий текст.
  _showInputError(inputElement) {
    //Находим элемент отображения сообщения об ошибке.
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //Метод _hideInputError принимает на вход параметр inputElement (поле ввода).
  //Стилизует данное поле ввода, скрывая отображение наличия ошибки, а также скрывает элемент отображения сообщения об ошибке, очищая
  //при этом его текст.
  _hideInputError(inputElement) {
    //Находим элемент отображения сообщения об ошибке.
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Метод _isValid принимает на вход параметр inputElement (поле ввода).
  //Проверяет валидность поля ввода и, в зависимости, от результата - вызывает
  //метод _showInputError (отображение ошибки), либо метод _hideInputError (сокрытие ошибки).
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Метод _setEventListeners добавляет необходимые обработчики событий для всех полей ввода данной формы.
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Метод глобального включения валидации данных формы.
  //Задает слушатель события 'submit', отменяя при этом стандартное поведение формы,
  //а также вызывает метод _setEventListeners, устанавливая слушателей событий для полей ввода формы.
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  //Метод resetValidation сбрасывает состояние валидации формы к значению по-умолчанию:
  //сообщения об ошибках скрыты, стили полей приведены к валидным значениям, кнопка формы неактивна и недоступна.
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

}
