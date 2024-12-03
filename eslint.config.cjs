const parser = require('@babel/eslint-parser');
const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const reactHooks = require('eslint-plugin-react-hooks');
const js = require('@eslint/js');

const globals = require('globals');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: [
      '**/build',
      '**/public',
      '**/coverage',
      '**/node_modules',
      '**/.husky',
      '**/.nyc_output',
      '**/.yarn',
      '**/commitlint.config.js',
      'src/registerServiceWorker.js',
      'vite.config.js',
      'eslint.config.cjs',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'airbnb',
      'prettier',
      'plugin:react-hooks/recommended',
      'eslint:recommended',
    ),
  ),
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        JSX: 'readonly',
      },
    },
    rules: {
      'react/no-array-index-key': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'import/no-import-module-exports': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'warn', // to uncomment
      'default-param-last': 'warn', // to uncomment
    },
  },
];
