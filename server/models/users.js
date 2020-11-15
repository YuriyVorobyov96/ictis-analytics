const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const asyncCompare = promisify(bcrypt.compare);
const BCRYPTVAL = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.hashPassword = async function(password) {
  this.passwordHash = await new Promise((resolve, reject) => {
    bcrypt.hash(password, BCRYPTVAL, (err, res) => {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
};

userSchema.methods.comparePassword = function(password) {
  return asyncCompare(password, this.passwordHash).catch(() => false);
};

module.exports = mongoose.model('users', userSchema);
