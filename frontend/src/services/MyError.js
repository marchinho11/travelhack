export default class MyError {
  constructor({ statusCode, detail }) {
    this.statusCode = statusCode || 'Oops';
    this.message = detail;
    this.description = this.getDescription();
  }

  getDescription() {
    let description = '';
    switch (this.statusCode) {
    case 404:
      description = 'Сервер не найден';
      break;
    }
    return description;
  }
}
