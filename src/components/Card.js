export default class Card {
  constructor(cardObject, templateElem, userId, authorData, handleActions) {
    this._card = cardObject;
    this._cardName = this._card.name;
    this._cardImage = this._card.link;
    this._cardTemplate = templateElem;
    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;
    this._cardZoom = handleActions.handleCardZoom;
    this._cardDelete = handleActions.handleCardDelete;
    this._putLike = handleActions.handleCardLike;
    this._removeLike = handleActions.handleCardDeleteLike;
  }

  _createCard() {
    return document.
      querySelector(this._cardTemplate).
      content.querySelector('.element').
      cloneNode(true);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._likeIcon.classList.add('element__btn-like_active');
    } else {
      this._likeIcon.classList.remove('element__btn-like_active');
    }
  }

  _likedCard() {
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }

  _interactLike() {
    if (this._likedCard()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }

  makeCard() {
    this._cardElement = this._createCard();
    this._elementImages = this._cardElement.querySelector('.element__img');
    this._elementName = this._cardElement.querySelector('.element__caption');
    this._likeIcon = this._cardElement.querySelector('.element__btn-like');
    this._deleteIcon = this._cardElement.querySelector('.element__btn-del');
    this.likeSelector = this._cardElement.querySelector('.element__like-counter');

    this._elementName.textContent = this._cardName;
    this._elementImages.src = this._cardImage;
    this._elementImages.alt = this._cardName;

    this.renderCardLike(this._card);

    this._addEventHandlers();

    return this._cardElement;
  }

  _addEventHandlers = () => {
    this._likeIcon.addEventListener('click', () => this._interactLike())
    this._elementImages.addEventListener('click', () => this._cardZoom(this._cardName, this._cardImage));
    if (this._userId === this._authorId) {
      this._deleteIcon.addEventListener('click', () => this._cardDelete(this, this._cardId));
    } else {
      this._deleteIcon.remove();
    }
  }
}
