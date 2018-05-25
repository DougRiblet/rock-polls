const Poll = require('../models/poll');

const grabMakerPolls = async function grabAllPolls(req, res) {
  try {
    const creator = req.query.userid;
    const myPolls = await Poll.find({ creator });
    return res.status(200).json({ myPolls });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = grabMakerPolls;



