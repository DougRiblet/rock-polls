const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const Poll = require('./poll.js');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  polls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  }],
});

userSchema.pre('save', async function userPreSave(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashPass = await bcrypt.hash(this.password, 8);
    this.password = hashPass;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function userComparePW(candidatePassword, next) {
  try {
    const compareResults = await bcrypt.compare(candidatePassword, this.password);
    return compareResults;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
