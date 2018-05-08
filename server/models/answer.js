const mongoose = require('mongoose');
const User = require('./user.js');
const Poll = require('./poll.js');

const answerSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 80,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
  }
});

module.exports = mongoose.model('Answer', answerSchema);
