const mongoose = require('mongoose');
const { Schema } = mongoose;

const vkMembersFriendsSchema = new Schema({
  members: {
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model('vk_members_friends', vkMembersFriendsSchema);
