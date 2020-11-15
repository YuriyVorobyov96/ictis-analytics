const httpStatus = require('http-status-codes');
const debug = require('debug')('App:HttpError');

class HttpError extends Error {

  constructor(code, why) {
    super(why);
    this.data = why;
    this.code = code;
    debug('At make error', why);
  }

  static withCode(code) {
    return why => new HttpError(code, why);
  }

  static unprocessableEntity(why) {
    return new HttpError(httpStatus.UNPROCESSABLE_ENTITY, why);
  }

  static badRequest(why) {
    return new HttpError(httpStatus.BAD_REQUEST, why);
  }

  static notFound(why) {
    return new HttpError(httpStatus.NOT_FOUND, why);
  }

  static forbidden(why) {
    return new HttpError(httpStatus.FORBIDDEN, why);
  }

  static unauthorized(why) {
    return new HttpError(httpStatus.UNAUTHORIZED, why);
  }

}

module.exports = HttpError;
