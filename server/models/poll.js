const mongoose = require('mongoose');
const User = require('./user.js');

const pollSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    maxLength: 400,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  },
});

module.exports = mongoose.model('Poll', pollSchema);
