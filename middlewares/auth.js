const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../envConfig');

module.exports = (req, res, next) => {
  console.log(req.cookies);
  console.log(req.header.Cookie);
  if (!req.header.Cookie) {
    throw new Error('Unauthorized');
  }

  const token = req.header.Cookie.jwt;
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
