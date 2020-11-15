const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const { nodeAuthSecret } = require('../config/config');
const { badRequest, unauthorized } = require('../controllers/http-error');
const debug = require('debug')('Auth:service');

module.exports = {
  async login(email, password) {
    const user = await Users
      .findOne({ email });

    if (!user) {
      throw badRequest({ message: 'Пользователь с таким электронным адресом не зарегистрирован.' });
    }
    if (user.isActivated === false) {
      throw badRequest({ message: 'Пользователь не активирован.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw unauthorized({ message: 'Неверный пароль.' });
    }

    const tokenInfo = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };

    const token = jwt.sign(
      tokenInfo,
      nodeAuthSecret,
      { expiresIn: '24h' },
    );

    jwt.verify(token, nodeAuthSecret, (err, data) => {
      debug(err, data);
      if (err) {
        throw unauthorized({ message: 'Ошибка сервера, попробуйте позже.' });
      }
    });

    return { token };
  },
  async register(email, password) {
    const existingUser = await Users
      .findOne({ email });

    if (existingUser) {
      throw badRequest({ message: 'Пользователь с таким электронным адресом уже существует.' });
    }

    const user = new Users({
      email,
      password,
    });

    await user.hashPassword(password);

    try {
      await user.save();
    } catch (err) {
      debug(err);
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }
  },
};
