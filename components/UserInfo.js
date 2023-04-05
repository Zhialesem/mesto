export default class UserInfo {
    constructor({ selectorName, selectorJob }) {
        this._selectorName = selectorName;
        this._selectorJob = selectorJob;
    }

    getUserInfo() {
        return {
            name: this._selectorName.textContent,
            job: this._selectorJob.textContent
        }
    }

    setUserInfo(element) {
        this._selectorName.textContent = element.name;
        this._selectorJob.textContent = element.job;
    }
}