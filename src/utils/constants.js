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

// Получаем элемент иконки редактирования профиля
const profileEditingIcon = document.querySelector('.profile__avatar-edit');
// Получаем элемент иконки добавления места
const iconAddCard = document.querySelector('.profile__btn-add');
// Получаем popup редактирования профиля
const popupProfile = document.querySelector('.popup-profile');
// Получаем форму редактирования профиля
const formProfile = popupProfile.querySelector('.popup__form');
// Получаем popup добавления карточки
const popupCards = document.querySelector('.popup-new-item');
// Получаем форму popup добавления карточки
const formCards = popupCards.querySelector('.popup__form');
// Получаем input имени
const nameInput = popupProfile.querySelector('#name-input');
// Получаем input описания
const descriptionInput = popupProfile.querySelector('#about-input');
// Получаем popup редактирования аватара
const popupAvatarEdit = document.querySelector('.popup-avatar');
// Получаем форму редактирования аватара
const popupAvatarEditForm = popupAvatarEdit.querySelector('.popup__form');
// Получаем иконку редактирования аватара
const iconAvatarEdit = document.querySelector('.profile__avatar-edit');



export {
  profileEditingIcon, iconAddCard,
  popupProfile, popupCards,
  formProfile, nameInput,
  descriptionInput, formCards,
  popupAvatarEditForm, iconAvatarEdit
};

export { apiConnector, configValidity };
