const jwt = require("jsonwebtoken");
const User = require("../models/user");

let signup = function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }, function(err, data){
    if (err) {
      res.status(400).send("Error in signup");
      return;
    }
    res.status(200).json(data);
    return;
  })
};

module.exports = signup;
