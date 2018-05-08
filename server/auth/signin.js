require('dotenv').load();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signin = async function signin(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    const compareResults = await user.comparePassword(req.body.password);
    const { id, username } = user;
    if (compareResults) {
      const token = jwt.sign({ id, username }, process.env.JWT_KEY);
      return res.status(200).json({ id, username, token });
    }
    return res.status(400).send('Signin rejected');
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = signin;
