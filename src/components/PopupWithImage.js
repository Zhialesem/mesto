import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popupItem.querySelector('.popup__zoom-caption');
    this._popupImage = this._popupItem.querySelector('.popup__zoom-img');
  }

  open(description, image) {
    this._popupDescription.textContent = description;
    this._popupImage.src = image;
    this._popupImage.alt = description;
    super.open();
  }
}
