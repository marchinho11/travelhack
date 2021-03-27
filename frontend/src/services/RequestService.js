import MyError from '@/services/MyError';
import config from "../stores/config";
// import yapic from "yandex-pictures"

export default class RequestService {
  constructor(networkService, recommendationStore, filterStore) {
    this.networkService = networkService;
    this.recommendationStore = recommendationStore;
    this.filterStore = filterStore;
  }

  checkResponse = res => !(res instanceof MyError);

  async getTourList() {
    const res = await this.networkService.fetch('tours', this.filterStore.filterPanel);
    if (this.checkResponse(res)) {
      const tours = res?.map(tour => {
        // const country = config.countries.find(el => el.value === tour.country);
        // yapic.getImage({
        //   text: tour.name,
        //   count: 2
        // }).then((data) => {
        //   debugger;
        // })

      })
      this.recommendationStore.setList(res);
    } else {
      throw res;
    }
  }
  
  async getCountries(){
    const res = await this.networkService.fetch('countries',null, "GET");
    if (this.checkResponse(res)) {
      this.filterStore.setCountries(res);
    } else {
      throw res;
    }
  }
  
  async getUsers(){
    const res = await this.networkService.fetch('users',null, "GET");
    if (this.checkResponse(res)) {
      this.filterStore.setUsers(res);
    } else {
      throw res;
    }
  }
  // TODO куча запросов
}
