// npm install joi
// npm install celebrate
// npm install validator

const router = require('express').Router();
// const validator = require('validator'); // test
// const validateUrl = (value) => validator.isURL(value); // test
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const Article = require('../controllers/article.js');

router.get('/',
  celebrate({
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
  }),
  Article.returnSavedArticles);

router.post('/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2).trim(),
      title: Joi.string().required().trim().min(2)
        .max(30),
      text: Joi.string().required().trim(),
      date: Joi.string().required().trim().pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/),
      source: Joi.string().required().trim(),
      link: Joi.string().required().trim().uri(),
      image: Joi.string().required().trim().uri(),
    }),
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
  }),
  Article.createArticle);

router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex(),
    }),
    [Segments.COOKIES]: Joi.object({
      jwt: Joi.string().required(),
    }),
  }),
  Article.deleteArticleById);

module.exports = router;
