// npm install joi
// npm install celebrate
// npm install validator

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
      keyword: Joi.string().required().min(2).trim(),
      title: Joi.string().required().trim().min(2)
        .max(30),
      text: Joi.string().required().trim(),
      date: Joi.string().required().trim(),
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
