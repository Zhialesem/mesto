const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

const fieldProfileName = document.querySelector('.profile__name');
const fieldProfileJob = document.querySelector('.profile__job');
const fieldPopupInputName = document.querySelector('.popup__input_type_name');
const fieldPopupInputJob = document.querySelector('.popup__input_type_job');
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit");
const popupNewCard = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add");
const popups = document.querySelectorAll('.popup');
const template = document.getElementById('element');
const popupZoom = document.querySelector(".popup_zoom-active");
const fieldPopupZoomImg = popupZoom.querySelector('.popup__zoom-img');
const fieldPopupZoomCaption = popupZoom.querySelector('.popup__zoom-caption');
const addCardForm = document.forms['add-form'];                                //https://developer.mozilla.org/ru/docs/Web/API/Document/forms
const elementWrapper = document.querySelector('.elements');                    //card container

//open profile edit popup
editButton.addEventListener('click', (evt) => {
    openPopup(popupEditProfile);
    fieldPopupInputName.value = (fieldProfileName.textContent);
    fieldPopupInputJob.value = (fieldProfileJob.textContent);
});

// Edit profile submit handler
popupEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();                                                      // Эта строчка отменяет стандартную отправку формы.
    fieldProfileName.textContent = evt.target.name.value;
    fieldProfileJob.textContent = evt.target.job.value;
    closePopup(popupEditProfile);
});

//open popup for adding a new card
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

//close the popup when clicking on the cross or overlay
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            (evt.target.classList.contains('popup__btn-close'))) {
            closePopup(popup);
        }
    })
}
);

/*elementWrapper.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__btn-del')) {
        handleDelete(evt);
    } else if (evt.target.classList.contains('element__btn-like')) {
        handleLike(evt);
    } else if (evt.target.classList.contains('element__img')) {
        handleZoom(evt);
    }
});
*/

//zoom
const handleZoom = (caption, image) => {
    fieldPopupZoomImg.src = image;
    fieldPopupZoomCaption.textContent = caption;
    fieldPopupZoomImg.alt = caption;
    openPopup(popupZoom);
};

//deleting a card
const handleDelete = (evt) => {
    evt.target.closest('.element').remove();
};

//likes handler
const handleLike = (evt) => {
    evt.target.classList.toggle('element__btn-like_active');
};

//preparing a new card
const getElement = (caption, image) => {
    const newElement = template.content.cloneNode(true);             //создаем из темплейта
    const newElementCaption = newElement.querySelector('.element__caption');
    newElementCaption.textContent = caption;
    const newElementImage = newElement.querySelector('.element__img');
    newElementImage.src = image;
    newElementImage.alt = caption;
    const cardDeleteBtn = newElement.querySelector('.element__btn-del');
    cardDeleteBtn.addEventListener('click', (evt) => {
        handleDelete(evt)
    });
    const cardLikeBtn = newElement.querySelector('.element__btn-like');
    cardLikeBtn.addEventListener('click', (evt) => {
        handleLike(evt)
    });
    newElementImage.addEventListener('click', () => handleZoom(caption, image));
    return newElement;
};

//card rendering. initial - init. marker if card "from box"
const renderItem = (wrap, caption, image, initial) => {
    if (initial) {
        wrap.append(getElement(caption, image));  //"from box"
    }
    else wrap.prepend(getElement(caption, image));   //added card
};

//preparing a new card "from box"
initialCards.forEach((card) => {
    renderItem(elementWrapper, card.name, card.link, true);
});

///handling submit of new card popup
addCardForm.addEventListener('submit', (evt) => {
    const caption = evt.target.title.value;
    const image = evt.target.src.value;
    evt.preventDefault();
    evt.target.reset();                                                                       //https://developer.mozilla.org/ru/docs/Web/API/HTMLFormElement/reset
    renderItem(elementWrapper, caption, image, false);
    closePopup(popupNewCard);
});
