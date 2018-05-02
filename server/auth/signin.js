const jwt = require("jsonwebtoken");
const User = require("../models/user");

if(!process.env.JWT_KEY){
  let jwt_key = require('../jwt_key').key;
} else {
  let jwt_key = process.env.JWT_KEY;
}

let signin = function(req, res){
  User.findOne({username: req.body.username}, function(err, user){
    user.comparePassword(req.body.password, function(err, isMatch){
      if (err || !isMatch) {
        res.status(400).send("Invalid username or password");
        return;
      }
      let {id, username} = user;
      let token = jwt.sign({id, username}, jwt_key);
      res.status(200).json({id, username, token});
      return;
    });
  });
}

module.exports = signin;
