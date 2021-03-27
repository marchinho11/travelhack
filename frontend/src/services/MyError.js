export default class MyError {
  constructor({ status, detail }) {
    this.statusCode = status || 'Oops';
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
