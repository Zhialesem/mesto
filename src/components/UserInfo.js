export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, avatarLinkSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._avatarLink = document.querySelector(avatarLinkSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent
        }
    }

    setUserInfo(element) {
        this._profileName.textContent = element.name;
        this._profileJob.textContent = element.about;
    }
    
    setUserAvatar(element) {
        this._avatarLink.src = element.avatar;
    }
    
}