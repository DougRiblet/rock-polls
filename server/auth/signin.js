const jwt = require("jsonwebtoken");
const User = require("../models/user");

let signin = async function(req, res){
  let jwt_key;
  if(!process.env.JWT_KEY){
    jwt_key = require('../jwt_key').key;
  } else {
    jwt_key = process.env.JWT_KEY;
  }
  
  try {
    let user = await User.findOne({username: req.body.username});
    let compareResults = await user.comparePassword(req.body.password);
    let { id, username } = user;
    if (compareResults) {
      let token = jwt.sign({ id, username }, jwt_key);
      return res.status(200).json({ id, username, token });
    } else {
      return res.status(400).send('Signin rejected');
    }
  } catch(error) {
      return res.status(400).send(error);
  }
}

module.exports = signin;
