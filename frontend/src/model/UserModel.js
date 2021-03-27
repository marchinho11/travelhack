export default class UserModel {
  user_id;
  age;
  gender;
  
  constructor(obj) {
    this.user_id = obj?.user_id || null;
    this.age = obj?.age || null;
    this.gender = obj?.gender || null;
  }
}