module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'newline-after-var': 2, //变量声明后是否需要空一行
  },
};
