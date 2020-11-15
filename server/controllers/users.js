const httpStatus = require('http-status-codes');
const usersService = require('../services/usersService');
const { badRequest, unprocessableEntity } = require('./http-error');

module.exports = {
  getUsers(req, res) {
    res.status(httpStatus.OK).send({ getUsers: true });
  },
  async getUser(req, res) {
    const user = await usersService.login(req.params.id);

    res.status(httpStatus.OK).send(user);
  },
};
