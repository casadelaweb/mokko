module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'amd': true,
    'node': true,
  },
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended',],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint',],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'indent': ['error', 2,],
    'linebreak-style': ['error', 'windows',],
    'quotes': ['error', 'single',],
    'semi': ['error', 'never',],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always',
        'objects': 'always',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never',
      },
    ],
    'array-element-newline': [
      'error',
      {
        'ArrayExpression': {
          'multiline': true,
          'minItems': 4,
        },
        'ArrayPattern': {
          'multiline': true,
          'minItems': 4,
        },
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        'multiline': true,
        'minItems': 4,
      },
    ],
    'array-bracket-spacing': ['error', 'never',],
    'object-property-newline': 'error',
    'object-curly-newline': [
      'error',
      {
        'ObjectExpression': { 'multiline': true, },
        'ObjectPattern': { 'multiline': true, },
        'ImportDeclaration': {
          'minProperties': 8,
          'multiline': true,
        },
        'ExportDeclaration': { 'minProperties': 3, },
      },
    ],
    'object-curly-spacing': ['error', 'always',],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
