import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService, recommendationStore, filterStore) {
    this.networkService = networkService;
    this.recommendationStore = recommendationStore;
    this.filterStore = filterStore;
  }

  checkResponse = res => !(res instanceof MyError);

  async getTourList() {
    // const res = await this.networkService.fetch('signin', { email, password });
    // if (this.checkResponse(res)) {
    //   this.recommendationStore.setList(res);
    // } else {
    //   throw res;
    // }
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
