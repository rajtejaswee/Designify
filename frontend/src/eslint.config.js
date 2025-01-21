import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'], // Ignore the dist folder
  },
  {
    extends: [js.configs.recommended],
    files: ['**/*.{js,jsx}'], // Adjusted for JavaScript/JSX
    languageOptions: {
      ecmaVersion: 2020, // Modern JavaScript
      globals: globals.browser, // Browser-specific globals
    },
    plugins: {
      'react-hooks': reactHooks, // React hooks plugin
      'react-refresh': reactRefresh, // React refresh plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow constant exports for components
      ],
    },
  },
];
