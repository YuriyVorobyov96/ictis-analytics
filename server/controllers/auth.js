const httpStatus = require('http-status-codes');
const authService = require('../services/authService');
const { badRequest, unprocessableEntity } = require('./http-error');

const validateEmail = email => {
  const re = /^[-!#$%&'*+/\w=?^_{|}~](\.?[-!#$%&'*+/\w=?^_{|}~])*@\w(-?\w)*(\.[a-zA-Z](-?\w)*)+$/u;

  return re.test(email);
};

// eslint-disable-next-line no-magic-numbers
const validatePass = password => password.length >= 8;

module.exports = {
  async login(req, res) {
    const { body: { email, password } } = req;
    const error = {};

    if (!email) {
      error.email = 'Введите адрес электронной почты.';
    }
    if (!password) {
      error.password = 'Введите пароль.';
    }
    if (Object.keys(error).length) {
      throw unprocessableEntity(error);
    }

    const user = await authService.login(email, password);

    res.status(httpStatus.OK).send(user);
  },
  async register(req, res) {
    const { body: { email, password } } = req;
    const error = {};

    if (!email) {
      error.email = 'Введите адрес электронной почты.';
    }
    if (!password) {
      error.password = 'Введите пароль.';
    }
    if (Object.keys(error).length) {
      throw unprocessableEntity(error);
    }
    if (!validateEmail(email)) {
      throw badRequest({ message: 'Введите корректный адрес электронной почты.' });
    }
    if (!validatePass(password)) {
      throw badRequest({ message: 'Введите корректный пароль.' });
    }

    await authService.register(email, password);

    res.status(httpStatus.OK).send();
  },
};
