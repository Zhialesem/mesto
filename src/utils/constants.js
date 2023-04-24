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

const profileEditingIcon = document.querySelector('.profile__btn-edit');
const iconAddCard = document.querySelector('.profile__btn-add');
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.popup__form');
const popupCards = document.querySelector('.popup-new-item');
const formCards = popupCards.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('#name-input');
const descriptionInput = popupProfile.querySelector('#about-input');
const popupAvatarEdit = document.querySelector('.popup-avatar');
const popupAvatarEditForm = popupAvatarEdit.querySelector('.popup__form');
const iconAvatarEdit = document.querySelector('.profile__avatar-edit');

export {
  profileEditingIcon, iconAddCard,
  popupProfile, popupCards,
  formProfile, nameInput,
  descriptionInput, formCards,
  popupAvatarEditForm, iconAvatarEdit
};

export { apiConnector, configValidity };
