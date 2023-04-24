export default class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  addNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  sendUserData(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.job })
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.src })
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  putCardLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  deleteCardLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkServerResponse(res); })
  }
}
