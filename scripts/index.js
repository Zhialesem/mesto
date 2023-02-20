const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

const fieldProfileName = document.querySelector('.profile__name');  //ищем в документе поле имени
const fieldProfileJob = document.querySelector('.profile__job');
const fieldPopupInputName = document.querySelector('.popup__input_type_name');   //ищем в попапе поле имени
const fieldPopupInputJob = document.querySelector('.popup__input_type_job');
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit");
const popupNewCard = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add"); //ищем поле кнопки обработчик кнопки Добавить
const popups = document.querySelectorAll('.popup');
const template = document.getElementById('element');  //темплейт карточки
const popupZoom = document.querySelector(".popup_zoom-active");
const fieldPopupZoomImg = popupZoom.querySelector('.popup__zoom-img');
const fieldPopupZoomCaption = popupZoom.querySelector('.popup__zoom-caption');
const addCardForm = document.forms['add-form'];//https://developer.mozilla.org/ru/docs/Web/API/Document/forms
const elementWrapper = document.querySelector('.elements'); //контейнер карточек

//открыть попап редактирования профиля
editButton.addEventListener('click', (evt) => {
    openPopup(popupEditProfile);
    fieldPopupInputName.value = (fieldProfileName.textContent);
    fieldPopupInputJob.value = (fieldProfileJob.textContent);
});

// обработчик сабмита Edit profile
popupEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();    // Эта строчка отменяет стандартную отправку формы.
    fieldProfileName.textContent = evt.target.name.value;
    fieldProfileJob.textContent = evt.target.job.value;
    closePopup(popupEditProfile);
});

//открыть попап добавления новой карточки
addButton.addEventListener('click', () => {
    openPopup(popupNewCard);
});

//закрыть попап при щелчке на крестик или оверлей
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
        handleLiked(evt);
    } else if (evt.target.classList.contains('element__img')) {
        handleZoom(evt);
    }
});
*/

//зум
const handleZoom = (evt) => {
    const thisItem = evt.target.closest('.element'); //вызываем ближайший родительский элемент
    const fieldCardImg = thisItem.querySelector('.element__img');
    fieldPopupZoomImg.src = fieldCardImg.src;
    const fieldCardCaption = thisItem.querySelector('.element__caption');
    fieldPopupZoomCaption.textContent = fieldCardCaption.textContent;
    fieldPopupZoomImg.alt = fieldCardCaption.textContent;
    openPopup(popupZoom);
};

//удаление карточки
const handleDelete = (evt) => {
    evt.target.closest('.element').remove();
};

//обработка лайков
const handleLiked = (evt) => {
    evt.target.closest('.element__btn-like').classList.toggle('element__btn-like_active');
};

//подготовка новой карточки
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
        handleLiked(evt)
    });
    const cardZoomBtn = newElement.querySelector('.element__img');
    cardZoomBtn.addEventListener('click', (evt) => {
        handleZoom(evt)
    });
    return newElement;
};

//отрисовка карточки. initial - маркер для добавления карты из коробки
const renderItem = (wrap, caption, image, initial) => {
    if (initial) {
        wrap.append(getElement(caption, image));  //в конец, если из коробки
    }
    else wrap.prepend(getElement(caption, image));   //в начало
};

//подготовка карточек из коробки
initialCards.forEach((card) => {
    renderItem(elementWrapper, card.name, card.link, true);
});

///обработка submit попапа новой карточки
addCardForm.addEventListener('submit', (evt) => {
    const caption = evt.target.title.value;
    const image = evt.target.src.value;
    evt.preventDefault();
    //evt.target.title.value = '';
    //evt.target.src.value = '';
    evt.target.reset();  //https://developer.mozilla.org/ru/docs/Web/API/HTMLFormElement/reset
    renderItem(elementWrapper, caption, image, false);
    closePopup(popupNewCard);
});



/*logo затемнение
const logoField = document.querySelector(".header__logo");
toggleLogo = () => {
    logoField.classList.toggle('header__logo_active');
};
logoField.addEventListener('mouseover', toggleLogo);          /
logoField.addEventListener('mouseout', toggleLogo);


/* Переделать сбор входов
const newData = {};
const values = modalWindow.querySelectorAll('.input');
values.forEach((data) => {
    newData[data.name] = data.value;
*/