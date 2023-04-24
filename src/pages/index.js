import './index.css';

import { apiConnector, configValidity } from '../utils/constants.js';

import {
  profileEditingIcon, iconAddCard,
  formProfile, nameInput,
  descriptionInput, formCards,
  popupAvatarEditForm, iconAvatarEdit
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';

const apiConnect = new Api(apiConnector);

let userId;

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__job',
  userAvatarSelector: '.profile__img'
});

const renderCard = function (cardObject) {
  const cardItem = new Card(cardObject, '#element', userId, { cardId: cardObject._id, authorId: cardObject.owner._id, },
    {
      handleCardZoom: (name, image) => { popupImageZoom.open(name, image) },
      handleCardDelete: (cardElement, cardId) => { popupNoticeDelete.open(cardElement, cardId) },
      handleCardLike: (cardId) => {
        apiConnect.putCardLike(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => { console.log(`Like error, ${err}`) })
      },

      handleCardDeleteLike: (cardId) => {
        apiConnect.deleteCardLike(cardId)
          .then((res) => {
            cardItem.renderCardLike(res);
          })
          .catch((err) => { console.log(`DizLike error, ${err}`) })
      },
    });
  return cardItem.makeCard();
}

const renderInitialCards = new Section({
  renderer: (cardObject) => {
    renderInitialCards.addItem(renderCard(cardObject));
  }
}, '.elements');

Promise.all([apiConnect.getUserData(), apiConnect.getInitialCards()]).then(([userProfileData, cardObject]) => {
  userId = userProfileData._id;
  userInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
  renderInitialCards.renderItems(cardObject.reverse());
  userInfo.setUserAvatar(userProfileData.avatar);
})
  .catch((err) => { console.log(`Receive user or cards data error, ${err}`) })

const popupImageZoom = new PopupWithImage('.popup_zoom-active');

popupImageZoom.setEventListeners();

const popupEditeAvatar = new PopupWithForm('.popup-avatar', {
  formSubmit: (userProfileData) => {
    popupEditeAvatar.putSavingProcessText(); apiConnect.sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditeAvatar.close();
      })
      .catch((err) => { console.log(`Send user avatar error, ${err}`) })
      .finally(() => {
        popupEditeAvatar.returnSavingProcessText();
      })
  }
});

popupEditeAvatar.setEventListeners();

const popupNoticeDelete = new PopupConfirm(".popup-delete", {
  callbackNotice: (cardElement, cardId) => {
    apiConnect.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupNoticeDelete.close();
      })
      .catch((err) => { console.log(`Delete cards error, ${err}`) })
  }
});

popupNoticeDelete.setEventListeners();

const popupEditeProfile = new PopupWithForm('.popup-profile', {
  formSubmit: (userProfileData) => {
    popupEditeProfile.putSavingProcessText();
    apiConnect.sendUserData(userProfileData)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, description: res.about });
        popupEditeProfile.close();
      })
      .catch((err) => { console.log(`Send user profile data error, ${err}`) })
      .finally(() => {
        popupEditeProfile.returnSavingProcessText();
      })
  }
});

popupEditeProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup-new-item', {
  formSubmit: (formValues) => {
    popupAddCard.putSavingProcessText(); apiConnect.addNewCard({ name: formValues.title, link: formValues.src })
      .then((card) => {
        renderInitialCards.addItem(renderCard(card));
        popupAddCard.close();
      })
      .catch((err) => { console.log(`Add new cards error, ${err}`) })
      .finally(() => {
        popupAddCard.returnSavingProcessText();
      })
  }
});

popupAddCard.setEventListeners();

const cardItemValidate = new FormValidator(configValidity, formCards);
cardItemValidate.enableValidationCheck();
const profileEditeValidate = new FormValidator(configValidity, formProfile);
profileEditeValidate.enableValidationCheck();
const profileAvatarEditValidate = new FormValidator(configValidity, popupAvatarEditForm);
profileAvatarEditValidate.enableValidationCheck();
profileEditingIcon.addEventListener('click', function () {
  popupEditeProfile.open();
  profileEditeValidate.resetValidate();
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.username;
  descriptionInput.value = actualUserInfo.description;
});

iconAvatarEdit.addEventListener('click', function () {
  popupEditeAvatar.open();
  profileAvatarEditValidate.resetValidate();
});

iconAddCard.addEventListener('click', function () {
  popupAddCard.open();
  cardItemValidate.resetValidate();
});
