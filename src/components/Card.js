export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {                          //pick up markap
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {                              //add data to markap

        this._element = this._getTemplate()
        this._cardElementImage = this._element.querySelector('.element__img');
        this._cardElementCaption = this._element.querySelector('.element__caption');
        this._cardLikeBtn = this._element.querySelector('.element__btn-like');
        this._cardDeleteBtn = this._element.querySelector('.element__btn-del');
        this._cardElementImage.alt = this._name;
        this._cardElementCaption.textContent = this._name;
        this._cardElementImage.src = this._link;

        this._setEventListeners();
        return this._element;
    }

    _handleLike() {
        this._cardLikeBtn.classList.toggle('element__btn-like_active');
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardElementImage.addEventListener('click', () =>
            this._handleCardClick({
                link: this._link,
                caption: this._name
            })
        );

        this._cardLikeBtn.addEventListener('click', () => this._handleLike())
        this._cardDeleteBtn.addEventListener('click', () => this._handleDelete())
    }

} 