const router = require('express').Router();

router.get('/*', () => {
  throw new Error('NotFound');
});

module.exports = router;
