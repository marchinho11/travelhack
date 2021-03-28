export default class TourModel {
  constructor(obj) {
    this.food_type = obj?.food_type;
    this.name = obj?.name;
    this.stars = obj?.stars;
    this.price = obj?.price;
    this.country = obj?.country;
    this.score = obj?.score;
    this.image = obj?.image;
    this.ranker_type = obj?.ranker_type;
    this.lat = obj?.lat;
    this.description = obj?.description;
    this.long = obj?.long;
    this.annotations = obj?.annotations || [];
  }
}