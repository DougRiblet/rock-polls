require('dotenv').load();
const jwt = require('jsonwebtoken');

const loginCheck = function loginCheck(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const userid = req.body.user_id || req.query.userid;
  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send(error);
    } else if (!decoded || decoded.id !== userid) {
      return res.status(401).send('Not logged in');
    }
    return next();
  });
};

module.exports = loginCheck;
