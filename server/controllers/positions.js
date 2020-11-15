const httpStatus = require('http-status-codes');
const Positions = require('../models/positions');
const { badRequest } = require('./http-error');

module.exports = {
  async readPositions(req, res) {
    const positions = await Positions
      .find({
        categoryId: req.params.categoryId,
        userId: req.user.id,
      });

    if (!positions) {
      throw badRequest({ message: 'Позиции не найдены' });
    }

    res.status(httpStatus.OK).send(positions);
  },
  async addPosition(req, res) {
    const position = await new Positions({
      name: req.body.name,
      cost: req.body.cost,
      categoryId: req.body.categoryId,
      userId: req.user.id,
    }).save();

    if (!position) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send(position);
  },
  async removePosition(req, res) {
    const position = await Positions
      .remove({ _id: req.params.id });

    if (!position) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send({ message: 'Позиция удалена' });
  },
  async updatePosition(req, res) {
    const position = await Positions
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
      );

    if (!position) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send(position);
  },
};
