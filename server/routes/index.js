const express = require('express');
const router = new express.Router();

const httpStatus = require('http-status-codes');

const usersRouter = require('./users');
const authRouter = require('./auth');
const analyticsRouter = require('./analytics');
const categoriesRouter = require('./categories');
const ordersRouter = require('./orders');
const positionsRouter = require('./positions');

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/analytics', analyticsRouter);
router.use('/categories', categoriesRouter);
router.use('/orders', ordersRouter);
router.use('/positions', positionsRouter);

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  const message = error.data ? error.data : { serverError: error.message };

  res
    .status(error.code || httpStatus.INTERNAL_SERVER_ERROR)
    .json(message);
});

module.exports = router;
