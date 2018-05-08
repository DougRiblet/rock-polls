require("dotenv").load();
const jwt = require("jsonwebtoken");

const loginCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.body.id) {
        return next();
      } else {
        return res.status(401).send('Not logged in');
      }
    });
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = loginCheck;
