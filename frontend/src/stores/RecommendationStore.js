import {
  action, computed, makeObservable, observable, toJS
} from 'mobx';

class RecommendationStore {
  list = (new Array(100).fill(0));

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
    });
  }

  setList(list) {

  }
}

export default RecommendationStore;
