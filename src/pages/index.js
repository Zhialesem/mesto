import './index.css';

import { apiConnector, configValidity } from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';



const popupZoom = document.querySelector(".popup_zoom-active");
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit");
const newCardPopup = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add");
const popupAva = document.querySelector(".popup-avatar");
const delButton = document.querySelector(".popup-delete");
// const fieldProfileName = document.querySelector('.profile__name');
// const fieldProfileJob = document.querySelector('.profile__job');

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
const validationCard = new FormValidator(configValidity, newCardPopup)
validationCard.enableValidation()
const validationAvatar = new FormValidator(configValidity, popupAva);
validationAvatar.enableValidation();
const popupWithImage = new PopupWithImage(popupZoom)

// user data
//form profile edit popup
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__job',
    avatarLinkSelector: '.profile__img'
})





//create new card
const getElement = (data, user) => {
    const card = new Card({
        data: data,
        userId: user,
        templateSelector: '#element',


            handleCardClick: () => {
                popupWithImage.open(data)
            },
            handleLikeClick: (cardID) => {
                apiConnect.likeCard(cardID)
                    .then((res) => {
                        card.showLikes(res)
                    }).catch((error) =>
                        console.log(`Ошибка лайка: ${error}`))
            },
            handleDeleteIconClick: (cardID, cardElement) => {
                popupWithSubmit.open(cardID, cardElement)

            },
            handleDeleteLikeClick: (cardID) => {
                apiConnect.deleteLikeCard(cardID)
                    .then((res) => {
                        card.showLikes(res)
                    }).catch((error) =>
                        console.log(`Ошибка удаления лайка: ${error}`))
            }
        }
    )
    return card.generateCard()
}


// New Card container
const cardContainer = new Section(
    {
        renderer: (item, userId) => {
            cardContainer.addItem(getElement(item, userId));
            console.log(item)
        }

    }, '.elements');





//open popup for adding a new card
const popupNewCard = new PopupWithForm(newCardPopup, {
    handleFormSubmit: ({ title, src }) => {
        cardContainer.addItem(getElement({
            name: title,
            link: src,
            alt: title
        }));
    }
});

const popupAddCard = new PopupWithForm(newCardPopup, {
    handleFormSubmit: (data) => {
        popupAddCard.renderLoading(true);
        apiConnect
            .postNewCard({
                name: data.place,
                link: data.link,
            })
            .then((res) => {
                cardContainer.getInitialCards(createCard(res, userId));
                popupAddCard.close();
            })
            .catch((error) => console.log(`Ошибка: ${error}`))
            .finally(() => {
                popupAddCard.renderLoading(false);
            });
    },
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
});

//open popup add card
addButton.addEventListener('click', () => {
    popupNewCard.open()
})




// popup with confirmation
const popupConfirm = new PopupConfirm(delButton, {
    handleFormSubmit: (id, card) => {
        popupConfirm.renderLoading(true);
        apiConnect
            .deleteCard(id)
            .then(() => {
                card.deleteCard();
                popupConfirm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithSubmit.renderLoading(false);
            });
    },
});


const apiConnect = new Api(apiConnector);
let userId;


Promise.all([apiConnect.getUserData(), apiConnect.getInitialCards()])
    .then(([dataUser, resCard]) => {
        userId = dataUser._id
        userInfo.setUserInfo(dataUser)
        userInfo.setUserAvatar(dataUser)
        cardContainer.renderItems(resCard, userId)
    }).catch((error) =>
        console.log(`Ошибка: ${error}`)
    )




popupWithImage.setEventListeners()
popupProfile.setEventListeners()
popupNewCard.setEventListeners()
popupConfirm.setEventListeners()
// popupAva.setEventListeners()



