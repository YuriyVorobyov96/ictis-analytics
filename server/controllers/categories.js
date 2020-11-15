const httpStatus = require('http-status-codes');
const Categories = require('../models/categories');
const Positions = require('../models/positions');
const { badRequest } = require('./http-error');

module.exports = {
  async list(req, res) {
    const categories = await Categories
      .find({ userId: req.user.id });

    res.status(httpStatus.OK).send(categories);
  },
  async readCategory(req, res) {
    const category = await Categories
      .findOne({ _id: req.params.id });

    res.status(httpStatus.OK).send(category);
  },
  async removeCategory(req, res) {
    const category = await Categories
      .remove({ _id: req.params.id });

    await Positions
      .remove({ categoryId: req.params.id });

    if (!category) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send({ message: 'Категория удалена' });
  },
  async addCategory(req, res) {

    const category = await new Categories({
      name: req.body.name,
      userId: req.user.id,
      imageSrc: req.file ? `images\\${req.file.filename}` : '',
    }).save();

    if (!category) {
      throw badRequest({ message: 'Ошибка сервера, попробуйте позже.' });
    }

    res.status(httpStatus.OK).send(category);
  },
  async updateCategory(req, res) {
    const infoUpdate = { name: req.body.name };

    if (req.file) {
      infoUpdate.imageSrc = `images\\${req.file.filename}`;
    }

    const category = await Categories
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: infoUpdate },
        { new: true },
      );

    res.status(httpStatus.OK).send(category);
  },
};
