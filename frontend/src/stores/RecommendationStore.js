import {
  action, computed, makeObservable, observable, toJS
} from 'mobx';

class RecommendationStore {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
    });
  }

  setList() {

  }
}

export default RecommendationStore;
