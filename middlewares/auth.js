const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../envConfig');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    throw new Error('Unauthorized');
  }
  // console.log(req.cookies);
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Unauthorized');
  }
  req.user = payload;
  // console.log(payload);
  next();
};
