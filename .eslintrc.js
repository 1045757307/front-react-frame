module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],
  },
  // overrides: [
  //   {
  //     files: ['**/*.ts?(x)'],
  //     extends: ['plugin:@typescript-eslint/recommended'],
  //     rules: {
  //       '@typescript-eslint/no-unused-vars': [
  //         'error',
  //         {
  //           vars: 'all',
  //           args: 'none',
  //           ignoreRestSiblings: true,
  //         },
  //       ],
  //       '@typescript-eslint/no-unused-expressions': 2,
  //     },
  //   },
  // ],
};
