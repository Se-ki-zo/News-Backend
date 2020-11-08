const User = require('../models/user.js');

module.exports.returnUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({
        data: user,
      });
    })
    .catch(next);
};
