export default class UserInfo {
    constructor({ profileName, profileJob }) {
        this._profileName = profileName;
        this._profileJob = profileJob;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        }
    }

    setUserInfo(element) {
        this._profileName.textContent = element.name;
        this._profileJob.textContent = element.job;
    }
}