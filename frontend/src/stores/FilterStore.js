import {
    action, makeObservable, observable, toJS
} from 'mobx';
import config from "./config";
import UserModel from "../model/UserModel";
import FilterModel from "../model/FilterModel";

export default class FilterStore {
    countries=[];
    users = [];
    
    currentUser = new UserModel();
    filterPanel = new FilterModel();
    
    constructor() {
        makeObservable(this, {
            users: observable,
            currentUser: observable,
            filterPanel: observable,
            countries: observable,
            setCountries: action,
            setUsers: action,
            setCurrentUser: action,
            setFilterPanel: action,
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
    
    setCurrentUser(obj){
        this.currentUser = new UserModel(obj);
    }
    
    setFilterPanel(obj){
        this.filterPanel = new FilterModel({...obj, ...this.currentUser});
    }
}
