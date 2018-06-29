require('dotenv').load();
const Poll = require('../models/poll');
const Answer = require('../models/answer');

const grabSinglePoll = async function grabSinglePoll(req, res) {
  try {
    const onePoll = await Poll.findById(req.query.id);
    const poolAnswers = [];
    for (const answer of onePoll.answers) {
      poolAnswers.push(Answer.findById(answer));
    }
    const opAnswers = await Promise.all(poolAnswers);
    return res.status(200).json({ onePoll, opAnswers });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = grabSinglePoll;
