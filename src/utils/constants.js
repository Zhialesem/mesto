const apiConnector = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-64/',
    headers: {
        authorization: '0db668de-4a82-44c2-a4e2-1bc6a294d6b6',
        'Content-Type': 'application/json'
    }
}

const configValidity = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__msg-error_visible'
};

export { apiConnector, configValidity };