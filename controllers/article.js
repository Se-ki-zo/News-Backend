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
      const card = article;
      card.owner = undefined; // don't return owner
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.returnSavedArticles = (req, res, next) => {
  Article.find({
    owner: req.user._id,
  })
    .then((article) => {
      const cards = article;
      for (let i = 0; i < article.length; i += 1) { // don't return owner
        cards[i].owner = undefined;
      }
      res.send({
        data: cards,
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
          .then(() => {
            const card = article;
            card.owner = undefined; // don't return owner
            res.send({
              data: card,
            });
          });
      } else {
        throw new Error('NotAllowed').message;
      }
    })
    .catch(next);
};
