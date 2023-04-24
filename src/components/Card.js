export default class Card {
    constructor(dataCard,  userId, templateSelector, handleClick) {
        this._card = dataCard;
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;

        this._userId = userId;
        this._cardId = authorData.cardId;
        this._authorId = authorData.authorId;

        this._zoom = handleClick.handleZoom;
        this._delete = handleClick.handleDelete;
        this._like = handleClick.handleLike;
        this._dizLike = handleClick.handleDizLike;
    }
    _getTemplate() {                          //pick up markap
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    //render  and count likes

    renderCardLike(card) {
        this._likeArea = card.likes;
        if (this._likeArea.length === 0) {
            this.likeSelector.textContent = '';
        } else { // counter likes from server
            this.likeSelector.textContent = this._likeArea.length;
        }
        if (this._likedCard()) {
            this._likeIcon.classList.add('element__btn-like_active');
        } else {
            this._likeIcon.classList.remove('element__btn-like_active');
        }
    }

    // find likes in the card
    _likedCard() {
        return this._likeArea.find((userLike) => userLike._id === this._userId);
    }

    // add and remove likes
    toggleLike() {
        if (this._likedCard()) {
            this._dizLike(this._cardId);
        } else {
            this._like(this._cardId);
        }
    }

    generateCard() {                              //add data to markap

        this._element = this._getTemplate()
        this._cardElementImage = this._element.querySelector('.element__img');
        this._cardElementCaption = this._element.querySelector('.element__caption');
        this._cardLikeBtn = this._element.querySelector('.element__btn-like');
        this._cardDeleteBtn = this._element.querySelector('.element__btn-del');
        this.likeSelector = this._element.querySelector('.element__like-counter');

        this._cardElementImage.alt = this._name;
        this._cardElementCaption.textContent = this._name;
        this._cardElementImage.src = this._link;

        this._setEventListeners();
        return this._element;
    }

    // Подготавливаем обработчики для экземпляра
    __setEventListeners = () => {
        this._cardLikeBtn.addEventListener('click', () => this._toggleLike())
        this._cardElementImage.addEventListener('click', () => this._zoom(this._name, this._link));
        if (this._userId === this._authorId) {
            this._cardDeleteBtn.addEventListener('click', () => this._delete(this, this._cardId));
        } else {
            this._cardDeleteBtn.remove();
        }
    }


    deleteCard() {
        this._element.remove();
        this._element = null;
    }

   
} 