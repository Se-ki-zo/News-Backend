const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../envConfig');

module.exports = (req, res, next) => {
  // console.log(req.headers.cookie);
  // console.log(req.headers);
  console.log(req.cookies.jwt);
  if (!req.cookies) {
    throw new Error('Unauthorized');
  }
  const token = req.cookies.jwt;
  // .replace('cookiename=; undefined; jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Unauthorized');
  }
  req.user = payload;
  next();
};
