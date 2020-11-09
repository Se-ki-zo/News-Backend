require('dotenv').config();

module.exports = {
  PORT: 3000,
  JWT_SECRET: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-secret',
  MONGO: (process.env.NODE_ENV === 'production') ? process.env.MONGO : 'mongodb://localhost:27017/articleDB',
};
