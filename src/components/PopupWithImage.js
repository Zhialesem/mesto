import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // Принимает в конструктор селектор popup
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupItem находится в родительском классе
    this._popupDescription = this._popupItem.querySelector('.popup__zoom-caption');
    this._popupImage = this._popupItem.querySelector('.popup__zoom-img');
  }
  // Метод перезаписывает родительский метод open
  open(description, image) {
    // Вставляем в popup картинку с src изображения и подписью к картинке
    this._popupDescription.textContent = description;
    this._popupImage.src = image;
    this._popupImage.alt = description;
    super.open();
  }
}
