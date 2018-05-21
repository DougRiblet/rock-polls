require('dotenv').load();
const Poll = require('../models/poll');
const Answer = require('../models/answer');

const grabSinglePoll = async function grabSinglePoll(req, res) {
  try {
    const onePoll = await Poll.findById(req.query.id);
    let opAnswers = [];
    for (let answer of onePoll.answers) {
      let newAns = await Answer.findById(answer);
      opAnswers.push(newAns);
    }
    return res.status(200).json({onePoll, opAnswers});
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = grabSinglePoll;
