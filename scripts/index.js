//popup open/ close
let editButton = document.querySelector(".profile__btn-edit"); //ищем поле кнопки
let closeButton = document.querySelector(".popup__btn-close"); //ищем поле кнопки
let popup = document.querySelector(".popup");

//read old data from html
function readDataFromText() {                                        // функция записи из текста в попап
    //name
    let profile_Name = document.querySelector('.profile__name');  //ищем в документе поле имени
    let popup_name = document.querySelector('.popup__name');   //ищем в попапе поле имени
    popup_name.value = (profile_Name.textContent);;   //в попап переписываем значение поля имени из хтмл

    //job
    let profile_Job = document.querySelector('.profile__job');
    let popup_job = document.querySelector('.popup__job');
    popup_job.value = (profile_Job.textContent);
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

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlyClick);


// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__job");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет


function handleFormSubmit(evt) {
    evt.preventDefault();


    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    profile_Name = document.querySelector('.profile__name'); // Выберите элементы, куда должны быть вставлены значения полей
    profile_Job = document.querySelector('.profile__job');

    // Вставьте новые значения с помощью textContent

    profile_Name.textContent = nameInput.value;
    profile_Job.textContent = jobInput.value;


    toggleOpenPopup();                                      //закрываем попап
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);






