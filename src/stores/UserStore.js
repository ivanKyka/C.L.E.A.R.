import {observable, action} from "mobx";

export default class UserStore {

    @observable user = {};
    @observable isLogged = false;

    @action
    setIsLogged(val) {
        this.isLogged = val;
    }

    @action
    setUser(user){
        this.user = user;
    }

}