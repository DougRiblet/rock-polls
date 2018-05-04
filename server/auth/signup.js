const jwt = require("jsonwebtoken");
const User = require("../models/user");

let signup = async function(req, res) {
  try {
    let newuser = await User.create(req.body);
    let { username, id } = newuser;
    return res.status(200).json({ username, id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = signup;
