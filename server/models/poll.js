const mongoose = require('mongoose');
const User = require('./user.js');
const Answer = require('./answer.js');

const pollSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    maxLength: 400,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
});

module.exports = mongoose.model('Poll', pollSchema);
