const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async function(req, res) {
  let jwt_key;
  if(!process.env.JWT_KEY){
    jwt_key = require('../jwt_key').key;
  } else {
    jwt_key = process.env.JWT_KEY;
  }

  try {
    let newuser = await User.create(req.body);
    let { username, id } = newuser;
    let token = jwt.sign({ id, username }, jwt_key);
    return res.status(200).json({ username, id, token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = signup;
