const path = require('path');

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    es2022: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: './',
    project: path.join(__dirname, 'tsconfig.json'),
  },
  extends: [
    'next/core-web-vitals',
    'airbnb-base',
  ],
  root: true,
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
  },
  rules: {
    '@next/next/no-img-element': 'off',
    'import/no-relative-packages': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    'require-atomic-updates': [
      'error',
      {
        allowProperties: true,
      },
    ],
  },
  settings: {
    'import/extensions': [
      '.js',
    ],
    'import/resolver': {
      node: {
        extensions: [
          '.js',
        ],
      },
    },
  },
};
