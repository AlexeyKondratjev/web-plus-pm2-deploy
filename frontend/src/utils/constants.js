export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');

export const avatarEditForm = document.forms.avatarEditForm;
export const profileEditForm = document.forms.profileEditForm;
export const cardAddForm = document.forms.cardAddForm;
export const deleteConfirmForm = document.forms.deleteConfirmForm;

export const validationOptions = {
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

export const configData = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '15079f84-7c32-450a-9816-73a1a409c0ce',
    'Content-Type': 'application/json'
  }
}
