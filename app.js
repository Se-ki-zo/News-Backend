// npm install body-parser
// npm install cookie-parser
// npm install dotenv
// npm install helmet --save

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  errors,
} = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter.js');
const { MONGO, PORT } = require('./envConfig.js');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger.js');
const auth = require('./middlewares/auth.js');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter);

const articles = require('./routes/articles.js');
const user = require('./routes/user.js');
const otherReq = require('./routes/otherReq.js');
const createUser = require('./routes/auth.js');
const login = require('./routes/auth.js');

app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, user);
app.use('/articles', auth, articles);

app.use('/', otherReq);

app.use(errorLogger);
app.use(errors());

app.use(require('./errors/errCatcher').errCatcher); // Централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`
  ======================
  Server has been started.
  ======================
  Current port: [ ${PORT} ]
  ======================
  Current time: [ ${new Date().getHours()}:${new Date().getMinutes()} ]
  ======================
  Enjoy this crap. :)
  ======================
  `);
});

module.exports = app;
