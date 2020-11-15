const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { nodeAuthSecret } = require('../config/config');
const usersService = require('../services/usersService');
const debug = require('debug')('Token:check');
const { wrap } = require('../helpers/catchError');
const { unauthorized } = require('../controllers/http-error');

const asyncVerify = promisify(jwt.verify);

module.exports = {
  ensureToken: wrap(async(req, res, next) => {
    const { headers: { authorization } } = req;

    if (typeof authorization === 'undefined') {
      throw unauthorized({ message: 'Вы не авторизованы.' });
    }

    try {
      const decodedToken = await asyncVerify(authorization, nodeAuthSecret);

      // eslint-disable-next-line require-atomic-updates
      req.user = await usersService.getUser(decodedToken.id);

      return next();
    } catch (error) {
      debug(error);
      throw unauthorized({ message: 'Вы не авторизованы.' });
    }
  }),
};
