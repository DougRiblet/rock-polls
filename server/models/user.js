const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hashPass = await bcrypt.hash(this.password, 8);
    this.password = hashPass;
    return next();
  } catch (error) {
    return next(error);
  }

});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let compareResults = await bcrypt.compare(candidatePassword, this.password);
    return compareResults;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
