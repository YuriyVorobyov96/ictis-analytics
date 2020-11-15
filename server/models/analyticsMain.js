const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsMainSchema = new Schema({
  date: {
    type: Date,
    default: new Date(new Date().getTime() - '86400000'),
  },
  usersCount: {
    type: Number,
    required: true,
  },
  newUsersCount: {
    type: Number,
    required: true,
  },
  sessionsCount: {
    type: Number,
    required: true,
  },
  pageViewsCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('analytics_main', analyticsMainSchema);
