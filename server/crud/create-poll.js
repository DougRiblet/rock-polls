require('dotenv').load();
const Poll = require('../models/poll');
const Answer = require('../models/answer');

const createPoll = async function createPoll(req, res) {
  try {
    let newPoll = await Poll.create({
      question: req.body.question,
      creator: req.body.user_id,
    });
    let npas = [];
    for (let answer of req.body.answers) {
      const newAnswer = await Answer.create({
        text: answer,
        count: 0,
        poll: newPoll._id,
      })
      await Poll.findOneAndUpdate(
        { _id: newPoll._id },
        { $push: { answers: newAnswer._id}},
      );
      npas.push(newAnswer);
    }
    newPoll.answers = npas;
    return res.status(200).json({ poll: newPoll });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = createPoll;
