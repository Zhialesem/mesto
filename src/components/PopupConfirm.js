import Popup from './Popup.js'

export default class PopupConfirm extends Popup {

    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector('.popup__form');
        this._callbackSubmit = callbackSubmit;
        this._buttonText = this._submitButton.textContent
    }

    open(cardObject, cardId) {
        this._cardObject = cardObject;
        this._cardId = cardId;
        super.open();
    }

    renderLoading(loading) {
        if (loading) {
            this._buttonSave.textContent = 'Сохранение...'
        }
        else {
            this._buttonSave.textContent = this._buttonText
        }
    }

    setEventListeners() {
        this._submitButton.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit(this._cardObject, this._cardId)
        })
        super.setEventListeners();
    }
}