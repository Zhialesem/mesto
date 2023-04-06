export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__btn-close');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => { this.close() });
        this._popupSelector.addEventListener('mousedown', this._handleOverlayClose);
    }
}