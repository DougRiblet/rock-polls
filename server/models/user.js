var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Borrowing from tutorial at:
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
