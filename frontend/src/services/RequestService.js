import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService, recommendationStore, filterStore) {
    this.networkService = networkService;
    this.recommendationStore = recommendationStore;
    this.filterStore = filterStore;
  }

  checkResponse = res => !(res instanceof MyError);

  async getTourList(filters) {
    const res = await this.networkService.fetch('tours', filters);
    if (this.checkResponse(res)) {
      console.log(res);
      //this.recommendationStore.setList(res);
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
  // TODO куча запросов
}
