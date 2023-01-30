//popup open/ close
let editButton = document.querySelector(".profile__btn-edit");
let closeButton = document.querySelector(".popup__btn-close");
let popup = document.querySelector(".popup");

function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');
};

let handleEditButtonClick = () => {
    toggleOpenPopup();
};

let handleCloseButtonClick = () => {
    toggleOpenPopup();
};

let handleOverlyClick = (event) => {
    if (event.target === event.currentTarget) {
        toggleOpenPopup();
    }
};

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlyClick);

//read data from html
let saveButton = document.querySelector('.popup__btn-save');

let profile_Name = document.querySelector('.profile__name');
let profileName = (profile_Name.textContent);

console.log(profileName)

let popup_name = document.querySelector('.popup__name');
popup_name.value = profileName;
console.log(popup_name.value)

