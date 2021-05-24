module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 0,
    'prettier/prettier': 'error',
    'wrap-iife': 0,
  },
};
