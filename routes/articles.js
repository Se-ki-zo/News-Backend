/* eslint-disable max-len */

// npm install joi
// npm install celebrate

const router = require('express').Router();
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
      keyword: Joi.string().required().min(2),
      title: Joi.string().required().min(2).max(30),
      text: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().pattern(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/),
      image: Joi.string().required().pattern(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/),
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
