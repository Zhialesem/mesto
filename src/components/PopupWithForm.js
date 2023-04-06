import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this.__popupSelector = popupSelector;
        this._form = this.__popupSelector.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._InputValues = {}; //объект значений всех инпутов формы
        this._inputList.forEach((input) => {
            this._InputValues[input.name] = input.value;
        });

        return this._InputValues;
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

    close() {
        super.close()
        this._form.reset()
    }
}
