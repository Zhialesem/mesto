export default class Section {// вставляет готовую разметку в DOM
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, user) {
        items.forEach(item => {
            this._renderer(item, user);
        })
    }

    addItem(element) {
        this._container.append(element);
    }

    addInitalCards(element) {
        this._container.prepend(element);
    }
}