require('dotenv').load();
const Poll = require('../models/poll');

const grabAllPolls = async function grabAllPolls(req, res) {
  try {
    const allPolls = await Poll.find().sort({'date': -1}).limit(20);
    return res.status(200).json({ allPolls });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = grabAllPolls;
