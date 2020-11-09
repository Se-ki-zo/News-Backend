module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  rules: {
    'no-unused-vars': 1,
    'no-console': 'off',
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
    }],
  },
  parserOptions: {
    ecmaVersion: 12,
  },
};
