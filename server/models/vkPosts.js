const mongoose = require('mongoose');
const { Schema } = mongoose;

const vkPostsSchema = new Schema({
  date: { type: Date },
  postId: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    required: true,
  },
  repostsCount: {
    type: Number,
    required: true,
  },
  commentsCount: {
    type: Number,
    required: true,
  },
  viewsCount: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('vk_posts', vkPostsSchema);
