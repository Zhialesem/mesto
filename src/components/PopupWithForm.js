import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popup, { handleFormSubmit }) {
        super(popup);
        this._selector = popupElement;
        this._handleFormSubmit = handleFormSubmit;
        this._popup = popup;
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._buttonSave = this._formElement.querySelector('.popup__button')
        this._buttonText = this._buttonSave.textContent
    }

    _getInputValues() {
        this._inputValues = {}; //объект значений всех инпутов формы
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    takeInputValues(element) {
        this._inputList.forEach((input) => {
            input.value = element[input.name]
        })
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            this.close()
        })
    }

    renderLoading(loading) {
      if(loading) {
      this._buttonSave.textContent = 'Сохранение...'
      }
      else{
        this._buttonSave.textContent = this._buttonText
      }
    }

    close() {
        super.close()
        this._form.reset()
    }
}
