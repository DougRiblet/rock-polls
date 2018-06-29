const Poll = require('../models/poll');
const Answer = require('../models/answer');

const addAltAnswer = async function addAltAnswer(req, res) {
  try {
    const { pollId, answerText } = req.body;
    const newAnswer = await Answer.create({
      text: answerText,
      count: 1,
      poll: pollId,
    });
    await Poll.findOneAndUpdate(
      { _id: pollId },
      { $push: { answers: newAnswer._id } },
    );
    return res.status(200).json(newAnswer);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = addAltAnswer;
