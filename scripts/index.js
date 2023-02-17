OpenPopup = (popup) => {
    popup.classList.add('popup_opened');
};

ClosePopup = (popup) => {
    popup.classList.remove('popup_opened');
};

//read old TEXT from html to INPUT popup
textFromTo = (fieldFrom, fieldTo) => {
    fieldTo.value = (fieldFrom.textContent);
};

//открыть попап редактирования профиля
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit"); 
editButton.addEventListener('click', (evt) => {
    OpenPopup(popupEditProfile);
    let fieldFrom = document.querySelector('.profile__name');  //ищем в документе поле имени
    let fieldTo = document.querySelector('.popup__input_type_name');   //ищем в попапе поле имени
    textFromTo(fieldFrom, fieldTo);
    fieldFrom = document.querySelector('.profile__job');
    fieldTo = document.querySelector('.popup__input_type_job');
    textFromTo(fieldFrom, fieldTo);
});

// обработчик сабмита Edit profile
popupEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();    // Эта строчка отменяет стандартную отправку формы.
    const fieldFirstStr = document.querySelector('.profile__name'); /
    const fieldSecondStr = document.querySelector('.profile__job');
    fieldFirstStr.textContent = evt.target.name.value;  
    fieldSecondStr.textContent = evt.target.job.value;
    ClosePopup(popupEditProfile);
});

//открыть попап добавления новой карточки
const popupNewCard = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add"); //ищем поле кнопки обработчик кнопки Добавить
addButton.addEventListener('click', () => {
    OpenPopup(popupNewCard);
});

//закрыть попап при щелчке на крестик или оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            (evt.target.classList.contains('popup__btn-close'))) {
            ClosePopup(popup);
        }
    })
}
);

//слушатель кнопок удалить и отлайкать и отзумить
const elementWrapper = document.querySelector('.elements'); //контейнер карточки
elementWrapper.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__btn-del')) {
        handleDeconstr(evt);
    } else if (evt.target.classList.contains('element__btn-like')) {
        handleLiked(evt);
    } else if (evt.target.classList.contains('element__img')) {
        handleZoom(evt);
    }
});

//зум
const popupZoom = document.querySelector(".popup_zoom-active");
console.log(popupZoom)
const handleZoom = (evt) => {
    const thisItem = evt.target.closest('.element'); //вызываем ближайший родительский элемент
    const fieldImg = thisItem.querySelector('.element__img');
    const srcImg = popupZoom.querySelector('.popup__zoom-img');
    srcImg.src = fieldImg.src;
    const fieldFrom = thisItem.querySelector('.element__caption');
    const fieldTo = popupZoom.querySelector('.popup__zoom_caption');
    fieldTo.textContent = fieldFrom.textContent;
    OpenPopup(popupZoom);

};

//удаление карточки
const handleDeconstr = (evt) => {
    evt.target.closest('.element').remove();
};

//обработка лайков
const handleLiked = (evt) => {
    evt.target.closest('.element__btn-like').classList.toggle('element__btn-like_active');
};

//подготовка новой карточки
const template = document.getElementById('element');  //темплейт карты
const getElement = (caption, image) => {
    const newElement = template.content.cloneNode(true);             //создаем из темплейта
    const newElementCaption = newElement.querySelector('.element__caption');//ищем в новом элементе заголовок
    newElementCaption.textContent = caption;                                 //передаем значение в поле
    const newElementImage = newElement.querySelector('.element__img');//поле картинки
    newElementImage.src = image;
    return newElement;
};

//отрисовка карточки. initial - маркер для добавления карты из коробки
const renderItem = (wrap, caption, image, initial) => {
    if (initial) {
        wrap.append(getElement(caption, image));  //в конец, если из коробки
    }
    else wrap.prepend(getElement(caption, image));         //в начало
};

//подготовка карточек из коробки
initialCards.forEach((card) => {
    renderItem(elementWrapper, card.name, card.link, initial = true);
});

///обработка submit попапа новой карточки
const formAddCard = document.querySelector(".popup__add-form");
formAddCard.addEventListener('submit', (evt) => {
    const caption = evt.target.title.value;
    const image = evt.target.src.value;
    evt.preventDefault();
    evt.target.title.value = '';
    evt.target.src.value = '';
    renderItem(elementWrapper, caption, image, initial = false);
    ClosePopup(popupNewCard);
});



//logo затемнение
const logoField = document.querySelector(".header__logo"); 
toggleLogo = () => {                                    
    logoField.classList.toggle('header__logo_active');
};
logoField.addEventListener('mouseover', toggleLogo);          //слушатель наезда и съезда с элемента лого
logoField.addEventListener('mouseout', toggleLogo);


/* Переделать сбор входов
const newData = {};
const values = modalWindow.querySelectorAll('.input');
values.forEach((data) => {
    newData[data.name] = data.value;
});*/