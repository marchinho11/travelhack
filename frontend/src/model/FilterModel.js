export default class FilterModel {
  constructor(obj) {
    this.country = obj?.country || "";
    this.user_id = obj?.user_id || "";
  }
}