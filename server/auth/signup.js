require('dotenv').load();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async function signup(req, res) {
  try {
    const newuser = await User.create(req.body);
    const { username, id } = newuser;
    const token = jwt.sign({ id, username }, process.env.JWT_KEY);
    return res.status(200).json({ username, id, token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = signup;
