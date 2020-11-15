const httpStatus = require('http-status-codes');
const Orders = require('../models/orders');
const { badRequest } = require('./http-error');

module.exports = {
  async list(req, res) {
    const query = { userId: req.user.id };

    if (req.query.start) {
      query.date = { $gte: req.query.start };
    }

    if (req.query.end) {
      if (!query.date) {
        query.date = {};
      }

      query.date = { $lte: req.query.end };
    }

    if (req.query.order) {
      query.order = Number(req.query.order);
    }

    const orders = await Orders
      .find(query)
      .sort({ date: -1 })
      .skip(Number(req.query.offset))
      .limit(Number(req.query.limit));

    res.status(httpStatus.OK).send(orders);
  },
  async addOrder(req, res) {
    const lastOrder = await Orders
      .findOne({ userId: req.user.id })
      .sort({ date: -1 });

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Orders({
      order: maxOrder + 1,
      userId: req.user.id,
      list: req.body.list,
    }).save();

    if (!order) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send(order);
  },
};
