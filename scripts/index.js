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
//popup open/ close
let editButton = document.querySelector(".profile__btn-edit"); //ищем поле кнопки
let addButton = document.querySelector(".profile__btn-edit"); //ищем поле кнопки
let closeButton = document.querySelector(".popup__btn-close"); //ищем поле кнопки
let popup = document.querySelector(".popup");

//logo
let logoField = document.querySelector(".header__logo"); //ищем поле кнопки

//read old data from html
function readDataFromText() {                                        // функция записи из текста в попап
    //name
    let profileName = document.querySelector('.profile__name');  //ищем в документе поле имени
    let popupName = document.querySelector('.popup__input_type_name');   //ищем в попапе поле имени
    popupName.value = (profileName.textContent);;   //в попап переписываем значение поля имени из хтмл

    //job
    let profileJob = document.querySelector('.profile__job');
    let popupJob = document.querySelector('.popup__input_type_job');
    popupJob.value = (profileJob.textContent);
};


function toggleLogo() {                                    //функция откр/закр __logo_active
    logoField.classList.toggle('header__logo_active');
};

function toggleOpenPopup() {                                    //функция откр/закр попапа
    popup.classList.toggle('popup_opened');
};

let handleEditButtonClick = () => {                        //обработчик кнопки 
    toggleOpenPopup();
    readDataFromText()                                     //и вызов заполнения попапа из текста
};

let handleCloseButtonClick = () => {                         //обработчик кнопки
    toggleOpenPopup();
};

let handleOverlyClick = (event) => {                        //обработчик кнопки
    if (event.target === event.currentTarget) {
        toggleOpenPopup();
    }
};


logoField.addEventListener('mouseover', toggleLogo);          //слушатель наезда и съезда с элемента лого
logoField.addEventListener('mouseout', toggleLogo);

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlyClick);


// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();


    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    profileName = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть вставлены значения полей
    profileJob = document.querySelector('.profile__job');

    // Вставьте новые значения с помощью textContent

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;


    toggleOpenPopup();                                      //закрываем попап
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

const elementWrapper = document.querySelector('.elements'); //контейнер фотографий
const form = document.querySelector('popup-new-item'); //попап добавления картинки
const template = document.getElementById('element');  //темплейт



const getElement = (caption, image) => {
    const newElement = template.content.cloneNode(true);             //создаем из темплейта
    const newElementCaption = newElement.querySelector('.element__caption');//ищем в новом элементе заголовок
    newElementCaption.textContent = caption;                                 //передаем значение в поле
    const newElementImage = newElement.querySelector('.element__img');//поле картинки
    newElementImage.src = image;
    return newElement;
}



const renderItem = (wrap, caption, image) => {
    wrap.append(getElement(caption, image));
}

initialCards.forEach((card) => {//пробегаем по начальному массиву
    const caption = card.name;
    const image = card.link;
    renderItem(elementWrapper, caption, image);

})







