module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  // eslint-config- || plugin:<PackageName>/<SettingName>
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    // Turns off all rules that are unnecessary or might conflict with Prettier.
    'prettier',
    // Resolving conflicts between prettier and @typescript-eslint.
    'prettier/@typescript-eslint'
  ],
  // eslint-plugin-
  plugins: [
    '@typescript-eslint',
    // Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
    'prettier',
    'react'
  ],
  // 指定全局变量且不允许被重写
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: false,
    jQuery: false
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  ecmaFeatures: {
    jsx: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ]
  }
}
