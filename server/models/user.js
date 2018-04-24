var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
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

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 8, function(err, hash) {
    if (err) {
      return next(err);
    }
    this.password = hash;
  });
  return next();
});

UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return next(err);
    }
    return next(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
