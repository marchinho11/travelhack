export default class TourModel {
  constructor(obj) {
    this.food_type = obj?.food_type;
    this.name = obj?.name;
    this.stars = obj?.stars;
    this.price = obj?.price;
    this.annotations = obj?.annotations || [];
  }
}