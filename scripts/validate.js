const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', true);
    }
};

const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
        inputElement.setAttribute('required', true);
        inputElement.addEventListener('input', function () {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        })
    })
    formElement.addEventListener('reset', () => {                   // ждем события 'reset' из файла index str. 143
        setTimeout(() => {                                          //таймаут на машинный такт
            toggleButtonState(config, inputList, buttonElement), 0
        })
    })
};

function enableValidation(config){
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(config, formElement);
    })
};

//const config = configValidity;
enableValidation(configValidity); 