import {
    action, makeObservable, observable, toJS
} from 'mobx';

export default class FilterStore {
    foodType = [];


    constructor() {
        makeObservable(this, {
            foodType: observable,
        });
    }
}
