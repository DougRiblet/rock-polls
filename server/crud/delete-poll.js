const Poll = require('../models/poll');
const Answer = require('../models/answer');

const deletePoll = async function deletePoll(req, res) {
  try {
    await Poll.deleteOne({ _id: req.body.pollId });
    await Answer.deleteMany({ poll: req.body.pollId });
    return res.status(200).send('deleted successfully');
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = deletePoll;
