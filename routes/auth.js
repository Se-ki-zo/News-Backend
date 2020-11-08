// npm install joi
// npm install celebrate

const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const Auth = require('../controllers/auth.js');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).pattern(/^\S*$/),
    }),
  }),
  Auth.createUser);

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  Auth.login);

module.exports = router;
