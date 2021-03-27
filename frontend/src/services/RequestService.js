import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService, recommendationStore) {
    this.networkService = networkService;
    this.recommendationStore = recommendationStore;
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
      console.log(res);
    } else {
      throw res;
    }
  }
  // TODO куча запросов
}
