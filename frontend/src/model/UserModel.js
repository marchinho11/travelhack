export default class UserModel {
  user_id;
  age;
  gender;
  
  constructor(obj) {
    this.user_id = obj.user_id;
    this.age = obj.age;
    this.gender = obj.gender;
  }
}