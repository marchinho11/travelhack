import {
  action, computed, makeObservable, observable, toJS
} from 'mobx';
import TourModel from "../model/TourModel";

class RecommendationStore {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
    });
  }

  setList(list) {
    this.list = list.map(el => new TourModel(el))
  }
}

export default RecommendationStore;
