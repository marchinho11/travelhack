import {
    action, makeObservable, observable, toJS
} from 'mobx';
import config from "./config";
import UserModel from "../model/UserModel";

export default class FilterStore {
    countries=[];
    users = [];

    constructor() {
        makeObservable(this, {
            users: observable,
            countries: observable,
            setCountries: action,
            setUsers: action,
        });
    }
    
    setCountries(list){
        this.countries = list.map(el => {
            const element = config.countries.find(obj => obj.value === el);
            if (element) return element
            return {value: el};
        })
    }
    
    setUsers(list){
        this.users =  list.map(el => new UserModel(el));
    }
}
