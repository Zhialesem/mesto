import './index.css';

import { initialCards, configValidity } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
//import Popup from '../components/Popup.js';

const popupZoom = document.querySelector(".popup_zoom-active");
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit");
const NewCardPopup = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add");
const fieldProfileName = document.querySelector('.profile__name');
const fieldProfileJob = document.querySelector('.profile__job');

// const fieldPopupInputName = document.querySelector('.popup__input_type_name');
// const fieldPopupInputJob = document.querySelector('.popup__input_type_job');
//const popups = document.querySelectorAll('.popup');
// const fieldPopupZoomImg = popupZoom.querySelector('.popup__zoom-img');
// const fieldPopupZoomCaption = popupZoom.querySelector('.popup__zoom-caption');
// const addCardForm = document.forms['add-form'];                                //https://developer.mozilla.org/ru/docs/Web/API/Document/forms
// const elementWrapper = document.querySelector('.elements');                    //card container
// const cardNameInput = document.querySelector('.popup__input_type_name');
// const cardLinkInput = document.querySelector('.popup__input_type_src');


const validationProfile = new FormValidator(configValidity, popupEditProfile)
validationProfile.enableValidation()
const validationCard = new FormValidator(configValidity, NewCardPopup)
validationCard.enableValidation()

const popupWithImage = new PopupWithImage(popupZoom)

//form profile edit popup                          
const userInfo = new UserInfo({
    selectorName: fieldProfileName,
    selectorJob: fieldProfileJob
})

//create new card                                 
const getElement = (item) => {
    const card = new Card(item, '#element', () => {
        popupWithImage.open(item)
    })
    return card.generateCard();
}

//open popup for adding a new card                            
const popupNewCard = new PopupWithForm(NewCardPopup, {
    handleFormSubmit: ({ title, src }) => {
        cardSecion.addItem(getElement({
            name: title,
            link: src,
            alt: title
        }));
    }
});

//Create profile popup                                            
const popupProfile = new PopupWithForm(popupEditProfile, {
    handleFormSubmit: (element) => {
        userInfo.setUserInfo(element)
    }
});

// Open profile popup
editButton.addEventListener('click', () => {
    popupProfile.open()
    popupProfile.takeInputValues(userInfo.getUserInfo());
    // validationProfile.resetInputs();
    // validationProfile.resetButton();
});

//open popup add card
addButton.addEventListener('click', () => {
    popupNewCard.open()
    // validationCard.resetInput();
    // validationCard.resetButton();
})

//New Card container
const cardSecion = new Section(
    {
        renderer: (card) => { cardSecion.addItem(getElement(card)) }
    }, '.elements');

cardSecion.renderItems(initialCards)

popupWithImage.setEventListeners()
popupProfile.setEventListeners()
popupNewCard.setEventListeners()


// //preparing a new card "from box"
// initialCards.forEach((card) => {
//     elementWrapper.append(getElement(card));
// });

// ///handling submit of new card popup
// addCardForm.addEventListener('submit', (evt) => {
//     const card = {
//         name: evt.target.title.value,
//         link: evt.target.src.value
//     };
//     evt.preventDefault();
//     evt.target.reset();                                                                       //https://developer.mozilla.org/ru/docs/Web/API/HTMLFormElement/reset
//     renderItem(card, elementWrapper);
//     closePopup(popupNewCard);
// });
