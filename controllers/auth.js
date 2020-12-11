// npm install bcryptjs
// npm install jsonwebtoken

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../envConfig');
const User = require('../models/user.js');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  req.body.password = req.body.password.trim();
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: false,
          sameSite: false,
        }).send({
          token,
        })
        .end();
    })
    .catch(next);
};
