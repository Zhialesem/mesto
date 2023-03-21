// import { configValidity } from './utils.js'
// import { Card } from './Card.js'

export class FormValidator {
    constructor(data, form) {
        this._data = data;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._form = form;
        this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
        this._buttonElement = form.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    };

    _showInputError = (inputElement, errorMessage) => {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        this._errorElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        this._errorElement.classList.remove(this._inputErrorClass);  // inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', true);
        }
    };

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
            inputElement.setAttribute('required', true);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
        this._form.addEventListener('reset', () => {                   // ждем события 'reset' из файла index str. 143
            setTimeout(() => {                                          //таймаут на машинный такт
                this._toggleButtonState(), 0
            })
        })
    }
}


