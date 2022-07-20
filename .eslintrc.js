module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
  },
  rules: {
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};
