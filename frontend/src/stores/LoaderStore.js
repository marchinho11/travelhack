import {
  action, makeObservable, observable, toJS
} from 'mobx';

export default class AppStore {
  isLoader = null;

  isTimer = false;

  constructor() {
    makeObservable(this, {
      isLoader: observable,
      setLoader: action,
    });
  }

  setLoader(value, fromTimer = false) {
    if (fromTimer) {
      if (this.isTimer) this.isLoader = value;
      this.isTimer = false;
    } else {
      this.isLoader = value;
      this.isTimer = false;
    }
  }

  getLoader = () => toJS(this.isLoader)

  startLoader() {
    this.isTimer = true;
    setTimeout(() => {
      this.setLoader(true, true);
    }, 200);
  }
}
