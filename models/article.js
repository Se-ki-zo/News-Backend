const mongoose = require('mongoose');
const isUrlValid = require('url-validation');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
    // default: Date.now,
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate(url) {
      return isUrlValid(url);
    },
  },

  image: {
    type: String,
    required: true,
    validate(url) {
      return isUrlValid(url);
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
