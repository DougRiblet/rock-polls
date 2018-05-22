const Poll = require('../models/poll');
const Answer = require('../models/answer');

const addAltAnswer = async function addAltAnswer(req, res) {
  try {
    const { pollId, newAnswer } = req.body;
    const retAnswer = await Answer.create({
      text: newAnswer,
      count: 1,
      poll: pollId,
    });
    await Poll.findOneAndUpdate(
      { _id: pollId },
      { $push: { answers: retAnswer._id}},
    );
    return res.status(200).json(retAnswer);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = addAltAnswer;
