import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageToPreview = this._popup.querySelector('.popup__image');
    this._imageHeadingToPreview = this._popup.querySelector('.popup__image-heading');
  }

  open(imgSrcValue, titleValue) {
    // Метод open перезаписывает родительский метод, вставляет в попап картинку с src изображения и подписью к картинке.
    this._imageToPreview.src = imgSrcValue;
    this._imageToPreview.alt = titleValue;
    this._imageHeadingToPreview.textContent = titleValue;
    super.open();
  }
}
