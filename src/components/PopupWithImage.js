import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._elementImage = this._popupSelector.querySelector('.popup__zoom-img');
        this._elementCaption = this._popupSelector.querySelector('.popup__zoom-caption');
    }
    open(element) {
        super.open()
        this._elementImage.src = element.link;
        this._elementImage.alt = element.name;
        this._elementCaption.textContent = element.name;
    }
}