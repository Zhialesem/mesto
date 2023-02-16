const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


OpenPopup = (popup) => {
    popup.classList.add('popup_opened');
};

ClosePopup = (popup) => {
    popup.classList.remove('popup_opened');
};


//read old data from html
readDataFromText = () => {                                        // функция записи из текста в попап
    //name
    const profileName = document.querySelector('.profile__name');  //ищем в документе поле имени
    const popupName = document.querySelector('.popup__input_type_name');   //ищем в попапе поле имени
    popupName.value = (profileName.textContent);;   //в попап переписываем значение поля имени из хтмл

    //job
    const profileJob = document.querySelector('.profile__job');
    const popupJob = document.querySelector('.popup__input_type_job');
    popupJob.value = (profileJob.textContent);
};


//открыть попап редактирования профиля
const popupEditProfile = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__btn-edit"); //ищем поле кнопки редактировать
const handleEditButtonClick = () => {
    OpenPopup(popupEditProfile);
    readDataFromText();
};
editButton.addEventListener('click', handleEditButtonClick);


//открыть попап добавления новой карточки
const popupNewCard = document.querySelector(".popup-new-item");
const addButton = document.querySelector(".profile__btn-add"); //ищем поле кнопки обработчик кнопки Добавить
const handleAddButtonClick = () => {
    OpenPopup(popupNewCard);
};
addButton.addEventListener('click', handleAddButtonClick);

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


// обработчик сабмита Edit profile
const formEditProfile = document.querySelector(".popup__edit-form");
function handleEditFormSubmit(evt) {
    evt.preventDefault();    // Эта строчка отменяет стандартную отправку формы.
    const fieldFirstStr = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть вставлены значения полей
    const fieldSecondStr = document.querySelector('.profile__job');
    fieldFirstStr.textContent = document.querySelector(".popup__input_type_name").value;  // Вставьте новые значения с помощью textContent
    fieldSecondStr.textContent = document.querySelector(".popup__input_type_job").value; // Получите значение полей jobInput и nameInput из свойства value
    ClosePopup(popupEditProfile);                                      //закрываем попап
}
formEditProfile.addEventListener('submit', handleEditFormSubmit);

const elementWrapper = document.querySelector('.elements'); //контейнер фотографий
const form = document.querySelector('popup-new-item'); //попап добавления картинки
const template = document.getElementById('element');  //темплейт


//удаление карточки
const handleDeconstr = (evt) => {
    evt.target.closest('.element').remove();
};
elementWrapper.addEventListener('click', (evt) => {
    console.log(evt.target);
    if (evt.target.classList.contains('element__btn-del')) {
        handleDeconstr(evt);
    } else if (evt.target.classList.contains('element__btn-like')) {
        handleLiked(evt);
    }
});


//обработка лайков
const handleLiked = (evt) => {
    evt.target.closest('.element__btn-like').classList.toggle('element__btn-like_active');
};

//подготовка новой карточки
const getElement = (caption, image) => {
    const newElement = template.content.cloneNode(true);             //создаем из темплейта
    const newElementCaption = newElement.querySelector('.element__caption');//ищем в новом элементе заголовок
    newElementCaption.textContent = caption;                                 //передаем значение в поле
    const newElementImage = newElement.querySelector('.element__img');//поле картинки
    newElementImage.src = image;
    return newElement;
}

//отрисовка карточки. initial - маркер для добавления карты из коробки
const renderItem = (wrap, caption, image, initial) => {
    if (initial) {
        wrap.append(getElement(caption, image));  //в конец, если из коробки
    }
    else wrap.prepend(getElement(caption, image));         //в начало
}

//подготовка карточек из коробки
initialCards.forEach((card) => {//пробегаем по начальному массиву
    renderItem(elementWrapper, card.name, card.link, initial = true);
})


function handleEditFormSubmit(evt) {
    evt.preventDefault();    // Эта строчка отменяет стандартную отправку формы.
    const fieldFirstStr = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть вставлены значения полей
    const fieldSecondStr = document.querySelector('.profile__job');
    fieldFirstStr.textContent = document.querySelector(".popup__input_type_name").value;  // Вставьте новые значения с помощью textContent
    fieldSecondStr.textContent = document.querySelector(".popup__input_type_job").value; // Получите значение полей jobInput и nameInput из свойства value
    ClosePopup(popupEditProfile);                                      //закрываем попап
}

//обработка submit попапа новой карточки
 const formAddCard = document.querySelector(".popup__add-form");


   
    formAddCard.addEventListener('submit', (evt) => {
        const cap = formAddCard.querySelector(".popup__input_type_name");
         const caption = formAddCard.querySelector(".popup__input_type_name").value;
          const im = formAddCard.querySelector(".popup__input_type_crc");
    const image = formAddCard.querySelector(".popup__input_type_crc").value;
       
        evt.preventDefault();
        renderItem(elementWrapper, caption, image, initial = false);
        // evt.target.title.value = '';

        ClosePopup(popupNewCard);
    })




//logo затемнение
const logoField = document.querySelector(".header__logo"); //ищем поле кнопки
toggleLogo = () => {                                    //функция откр/закр __logo_active
    logoField.classList.toggle('header__logo_active');
};
logoField.addEventListener('mouseover', toggleLogo);          //слушатель наезда и съезда с элемента лого
logoField.addEventListener('mouseout', toggleLogo);







