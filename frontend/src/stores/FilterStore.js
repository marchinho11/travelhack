import {
    action, makeObservable, observable, toJS
} from 'mobx';
import config from "./config";

export default class FilterStore {
    foodType = [];

    countries=[];

    constructor() {
        makeObservable(this, {
            foodType: observable,
            countries: observable,
            setCountries: action,
        });
    }
    
    setCountries(list){
        this.countries = list.map(el => {
            const element = config.countries.find(obj => obj.value === el);
            if (element) return element
            return {value: el};
        })
    }
}
