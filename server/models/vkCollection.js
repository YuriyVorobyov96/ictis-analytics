const mongoose = require('mongoose');
const { Schema } = mongoose;

const vkCollectionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  isClosed: {
    type: Boolean,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  universityMain: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  chairName: {
    type: String,
    required: true,
  },
  graduation: {
    type: Number,
    required: true,
  },
  educationForm: {
    type: String,
    required: true,
  },
  educationStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('vk_collection', vkCollectionSchema);
