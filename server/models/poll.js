const mongoose = require('mongoose');

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
  date: {
    type: Date,
    default: Date.now,
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
});

module.exports = mongoose.model('Poll', pollSchema);
