export default class FilterModel {
  constructor(obj) {
    console.log(obj);
    this.country = obj?.country || null;
    this.user_id = obj?.user_id || null;
  }
}