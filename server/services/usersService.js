const Users = require('../models/users');
const { badRequest } = require('../controllers/http-error');
const debug = require('debug')('Users:service');

module.exports = {
  async getUser(id) {
    const user = await Users
      .findOne({ _id: id });

    if (!user) {
      throw badRequest({ message: 'Пользователь не найден.' });
    }

    const result = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };

    return result;
  },
};
