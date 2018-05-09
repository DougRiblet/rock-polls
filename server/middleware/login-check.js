require('dotenv').load();
const jwt = require('jsonwebtoken');

const loginCheck = function loginCheck(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send(error);
    } else if (!decoded || decoded.id !== req.body.id) {
      return res.status(401).send('Not logged in');
    }
    return next();
  });
};

module.exports = loginCheck;
