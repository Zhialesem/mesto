export default class Api {
    constructor({ link, headers }) {
        this._link = link;
        this._headers = headers;
    }
    // if error
    _serverResponse(res) {
        if (res.ok) {
            return res.json();
            console.log(res.json())
        } else {
            return Promise.reject(`Код ошибки: ${res.status}`);
        }
    }
    // initial card from server
  
    getInitialCards() {
        return fetch(`${this._link}cards`, {
            headers: this._headers
               })
            .then(res => { return this._serverResponse(res); })
    }





    // add new card to the server
    postNewCard({ name, link }) {
        return fetch(`${this._link}cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({ name, link })
        })
            .then(res => { return this._serverResponse(res); })
    }
    // delete card from server
    deleteCard(cardId) {
        return fetch(`${this._link}cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => { return this._serverResponse(res); })
    }
    // get user data from server
    getUserData() {
        return fetch(`${this._link}users/me`, {
            headers: this._headers,
            method: 'GET'
        })
            .then(res => { return this._serverResponse(res); })
    }
    // send user data to server
    patchUserData(profileData) {
        return fetch(`${this._link}users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: profileData.username,
                about: profileData.description
            })
        })
            .then(res => { return this._serverResponse(res); })
    }
    // send data new ava to server
    patchAvaData(avatarLink) {
        return fetch(`${this._link}users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatarLink.avatar })
        })
            .then(res => { return this._serverResponse(res); })
    }
    // put like to server
    putCardLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
        })
            .then(res => { return this._serverResponse(res); })
    }
    // del like from server
    deleteCardLike(cardId) {
        return fetch(`${this._link}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => { return this._serverResponse(res); })
    }
}

