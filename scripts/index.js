import { initialCards, configValidity } from './utils.js';
import { Card } from './Card.js';
//import { configValidity } from './utils.js';
import { FormValidator } from './FormValidator.js';

const fieldProfileName = document.querySelector('.profile__name');
const fieldProfileJob = document.querySelector('.profile__job');
const fieldPopupInputName = document.querySelector('.popup__input_type_name');
const fieldPopupInputJob = document.querySelector('.popup__input_type_job');
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit");
const popupNewCard = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add");
const popups = document.querySelectorAll('.popup');
const popupZoom = document.querySelector(".popup_zoom-active");
const fieldPopupZoomImg = popupZoom.querySelector('.popup__zoom-img');
const fieldPopupZoomCaption = popupZoom.querySelector('.popup__zoom-caption');
const addCardForm = document.forms['add-form'];                                //https://developer.mozilla.org/ru/docs/Web/API/Document/forms
const elementWrapper = document.querySelector('.elements');                    //card container

const validationProfile = new FormValidator(configValidity, popupEditProfile)
validationProfile.enableValidation()
const validationCard = new FormValidator(configValidity, popupNewCard)
validationCard.enableValidation()

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

//open profile edit popup
editButton.addEventListener('click', (evt) => {
    openPopup(popupEditProfile);
    fieldPopupInputName.value = fieldProfileName.textContent;
    fieldPopupInputJob.value = fieldProfileJob.textContent;
});

//open popup for adding a new card
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

//zoom
const handleZoom = (data) => {
    fieldPopupZoomImg.src = data.link;
    fieldPopupZoomCaption.textContent = data.caption;
    fieldPopupZoomImg.alt = data.caption;
    openPopup(popupZoom);
};

//close the popup when clicking on the cross or overlay
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            (evt.target.classList.contains('popup__btn-close'))) {
            closePopup(popup);
        }
    })
});

//close the popup when pressing on the Esc key
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
};

// Edit profile submit handler
popupEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fieldProfileName.textContent = evt.target.name.value;
    fieldProfileJob.textContent = evt.target.job.value;
    closePopup(popupEditProfile);
});

/*elementWrapper.addEventListener('click', (evt) => { не хочу убирать
    if (evt.target.classList.contains('element__btn-del')) {
        handleDelete(evt);
    } else if (evt.target.classList.contains('element__btn-like')) {
        handleLike(evt);
    } else if (evt.target.classList.contains('element__img')) {
        handleZoom(evt);
    }
});
*/

//deleting a card
const handleDelete = (evt) => {
    evt.target.closest('.element').remove();
};

//likes handler
const handleLike = (evt) => {
    evt.target.classList.toggle('element__btn-like_active');
};

const getElement = (item) => {
    const card = new Card(item, '#element', handleZoom)
    return card.generateCard();
}

const renderItem = (card) => {
    elementWrapper.prepend(getElement(card));                                           //added card
};

//preparing a new card "from box"
initialCards.forEach((card) => {
    elementWrapper.append(getElement(card));
});

///handling submit of new card popup
addCardForm.addEventListener('submit', (evt) => {
    const card = {
        caption: evt.target.title.value,
        link: evt.target.src.value
    };
    evt.preventDefault();
    evt.target.reset();                                                                       //https://developer.mozilla.org/ru/docs/Web/API/HTMLFormElement/reset
    renderItem(card, elementWrapper);
    closePopup(popupNewCard);
});
