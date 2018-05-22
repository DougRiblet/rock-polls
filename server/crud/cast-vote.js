const Answer = require('../models/answer');

const castVote = async function castVote(req, res) {
  try {
    await Answer.findOneAndUpdate({ _id: req.params.id }, {
      $inc: { count: 1 },
    });
    return res.status(200).end();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = castVote;
