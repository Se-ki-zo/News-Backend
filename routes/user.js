// npm install joi
// npm install celebrate

const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const User = require('../controllers/user.js');

router.get('/me',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex(),
    }),
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
  }),
  User.returnUserInfo);

module.exports = router;
