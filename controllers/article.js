const Article = require('../models/article.js');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.send({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch(next);
};

module.exports.returnSavedArticles = (req, res, next) => {
  Article.find({
    owner: req.user._id,
  })
    .then((article) => {
      res.send({
        data: article,
      });
    })
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .orFail()
    .then((article) => {
      // console.log(req.user._id);
      // console.log(article.owner);
      if (req.user._id === String(article.owner)) {
        Article.findByIdAndRemove(req.params.id)
          .then(() => res.send({
            data: article,
          }));
      } else {
        throw new Error('NotAllowed').message;
      }
    })
    .catch(next);
};
