const mongoose = require('mongoose');
const { Schema } = mongoose;

const positionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  categoryId: {
    ref: 'categories',
    type: Schema.Types.ObjectId,
  },
  userId: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('positions', positionSchema);
