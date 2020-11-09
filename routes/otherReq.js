const router = require('express').Router();

router.get('/*', () => {
  throw new Error('NotFound');
});

router.post('/*', () => {
  throw new Error('MethodNotAllowed');
});

router.delete('/*', () => {
  throw new Error('MethodNotAllowed');
});

// router.put('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.patch('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.copy('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.head('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.options('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.link('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.unlink('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.purge('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.lock('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.unlock('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

// router.propfind('/*', () => {
//   throw new Error('MethodNotAllowed');
// });

module.exports = router;
