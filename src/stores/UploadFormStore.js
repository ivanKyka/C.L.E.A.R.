import {observable, action} from "mobx";

export default class UploadFormStore {

    @observable allUsers = [];
    @observable recivers = [];
    @observable fileName = '';
    file = undefined;


    @action
    addReciver(user){
        if (this.recivers.filter(el => el.id === user.id).length === 0)
            this.recivers.push(user);
    }

    @action
    removeReciver(user){
        this.recivers = this.recivers.filter(el => el.id !== user.id);
    }

    @action
    setUserList(list){
        this.allUsers = list;
    }

    @action
    setFile(file, fileName){
        this.file = file;
        this.fileName = fileName;
    }

}