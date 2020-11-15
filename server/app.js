const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const httpStatus = require('http-status-codes');
const cors = require('cors');
const config = require('./config/config');

const indexRouter = require('./routes/index');

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('body-parser').urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, Authorization');
  next();
});

app.use(cors({ origin: '*' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(httpStatus.NOT_FOUND));
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: 'Ошибка сервера. Повторите действие позже.', debug: error.message });
});

module.exports = app;
