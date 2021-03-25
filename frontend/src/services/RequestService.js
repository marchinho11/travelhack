import MyError from '@/services/MyError';

export default class RequestService {
  constructor(networkService) {
    this.networkService = networkService;
  }

  checkResponse = res => !(res instanceof MyError);

  async signIn({ email, password }) {
    const res = await this.networkService.fetch('signin', { email, password });
    if (this.checkResponse(res)) {
      this.networkService.setToken(res.token);
      localStorage.token = res.token;
      window.location.reload();
    } else {
      throw res;
    }
  }

  async signUp({ login, email, password }) {
    const res = await this.networkService.fetch('signup', { username: login, email, password });
    if (this.checkResponse(res)) {
      return true;
    }
    throw res;
  }

  async forgotPassword({ email }) {
    const res = await this.networkService.fetch('forgotpass', { email });
    if (this.checkResponse(res)) {
      return true;
    }
    throw res;
  }

  async updatePassword({ password, token }) {
    const res = await this.networkService.fetch('resetpass', { token, new_pass: password });
    if (this.checkResponse(res)) {
      return true;
    }
    throw res;
  }

  async changePassword({ oldPassword, newPassword }) {
    const res = await this.networkService.fetch('changepass', { old_pass: oldPassword, new_pass: newPassword });
    if (this.checkResponse(res)) {
      return true;
    }
    throw res;
  }

  async getUserData({ id }) {
    const res = await this.networkService.fetch(`usersV2/${id}/`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getUsers() {
    const res = await this.networkService.fetch('usersV2/', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getMyData() {
    const res = await this.networkService.fetch('usersV2/me/', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getSpecs() {
    const res = await this.networkService.fetch('skills/specialties', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getQuals() {
    const res = await this.networkService.fetch('skills/qualifications', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async updateUser({ id, data }) {
    const res = await this.networkService.fetch(`usersV2/${id}/`, { data: {}, ...data }, 'PUT');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async patchUser({ id, data }) {
    const res = await this.networkService.fetch(`usersV2/${id}/`, { data: {}, ...data }, 'PATCH');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getStartups() {
    const res = await this.networkService.fetch('startupV2/', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getStartup(id) {
    const res = await this.networkService.fetch(`startupV2/${id}`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getVacancies() {
    const res = await this.networkService.fetch('vacancies/', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getVacancy({ id }) {
    const res = await this.networkService.fetch(`vacancies/${id}`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async getRecommendationList() {
    const res = await this.networkService.fetch('usersV2/main', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async likeStartup({ score_type, startup }) {
    const res = await this.networkService.fetch(
      'scores/',
      {
        data: {}, employee: localStorage.user_id, score_type, startup
      },
      'POST'
    );
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async relikeStartup({ id, score_type }) {
    const res = await this.networkService.fetch(`scores/${id}/`, { data: {}, score_type }, 'PATCH');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async delikeStartup(id) {
    const res = await this.networkService.fetch(`scores/${id}/`, 0, 'DELETE');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async searchStartups(query) {
    const res = await this.networkService.fetch(`startupV2/?search=${query}`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async searchVacancies(query) {
    const res = await this.networkService.fetch(`vacancies/?search=${query}`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async searchUsers(query) {
    const res = await this.networkService.fetch(`usersV2/?search=${query}`, 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async createStartup(data) {
    const res = await this.networkService.fetch('startupV2/', { data: {}, ...data }, 'POST');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async createVacancy(data) {
    const res = await this.networkService.fetch('vacancies/', { data: {}, ...data }, 'POST');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async patchStartup({ id, ...data }) {
    const res = await this.networkService.fetch(`startupV2/${id}/`, { data: {}, ...data }, 'PATCH');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async patchVacancy({ id, ...data }) {
    const res = await this.networkService.fetch(`vacancies/${id}/`, { data: {}, ...data }, 'PATCH');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async deleteStartup(id) {
    const res = await this.networkService.fetch(`startupV2/${id}/`, 0, 'DELETE');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async deleteVacancy(id) {
    const res = await this.networkService.fetch(`vacancies/${id}/`, 0, 'DELETE');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  async allTags() {
    const res = await this.networkService.fetch('tags/', 0, 'GET');
    if (this.checkResponse(res)) {
      return res;
    }
    throw res;
  }

  // TODO куча запросов
}
