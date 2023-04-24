import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  constructor(popupSelector, { formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    // this._popupItem находится в родительском классе
    this._popupFormItem = this._popupItem.querySelector('.popup__form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    this._sendButton = this._popupItem.querySelector('.popup__button');
    this._sendButtonText = this._sendButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  putSavingProcessText() {
    this._sendButton.textContent = 'Сохранение...';
  }

  returnSavingProcessText() {
    this._sendButton.textContent = this._sendButtonText;
  }

  close() {
    super.close();
    this._popupFormItem.reset();
  }
}
