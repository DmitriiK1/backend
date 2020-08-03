class IncorrectError extends Error {
  constructor() {
    super('Произошла ошибка');
    this.statusCode = 400;
  }
}

module.exports = IncorrectError;
