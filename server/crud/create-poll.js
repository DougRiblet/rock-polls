require('dotenv').load();
const Poll = require('../models/poll');
const Answer = require('../models/answer');

const createPoll = async function createPoll(req, res) {
  try {
    const newPoll = await Poll.create({
      question: req.body.question,
      creator: req.body.user_id,
    });

    newPoll.answers = [];
    for (let answer of req.body.answers) {
      let newAnswer = await Answer.create({
        text: answer,
        count: 0,
        poll: newPoll._id,
      });
      newPoll.answers.push(newAnswer);
    }

    return res.status(200).json({ poll: newPoll });

  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = createPoll;
