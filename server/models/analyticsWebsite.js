const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsWebsiteSchema = new Schema({
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
  countries: [
    {
      name: { type: String },
      number: { type: Number },
    },
  ],
  cities: [
    {
      name: { type: String },
      number: { type: Number },
    },
  ],
  regions: [
    {
      name: { type: String },
      number: { type: Number },
    },
  ],
  pages: [
    {
      title: { type: String },
      path: { type: String },
      number: { type: Number },
    },
  ],
});

module.exports = mongoose.model('analytics_website', analyticsWebsiteSchema);
