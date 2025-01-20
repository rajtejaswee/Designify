export const basePrompt = `<designifyArtifact id=\"project-import\" title=\"Project Files\"><designifyAction type=\"file\" filePath=\"eslint.config.js\">import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);</designifyAction><designifyAction type=\"file\" filePath=\"index.html\"><!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id=\"root\"></div>
    <script type=\"module\" src=\"/src/main.tsx\"></script>
  </body>
</html>
</designifyAction><designifyAction type=\"file\" filePath=\"package.json\">{
  \"name\": \"vite-react-typescript-starter\",
  \"private\": true,
  \"version\": \"0.0.0\",
  \"type\": \"module\",
  \"scripts\": {
    \"dev\": \"vite\",
    \"build\": \"vite build\",
    \"lint\": \"eslint .\",
    \"preview\": \"vite preview\"
  },
  \"dependencies\": {
    \"lucide-react\": \"^0.344.0\",
    \"react\": \"^18.3.1\",
    \"react-dom\": \"^18.3.1\"
  },
  \"devDependencies\": {
    \"@eslint/js\": \"^9.9.1\",
    \"@types/react\": \"^18.3.5\",
    \"@types/react-dom\": \"^18.3.0\",
    \"@vitejs/plugin-react\": \"^4.3.1\",
    \"autoprefixer\": \"^10.4.18\",
    \"eslint\": \"^9.9.1\",
    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",
    \"eslint-plugin-react-refresh\": \"^0.4.11\",
    \"globals\": \"^15.9.0\",
    \"postcss\": \"^8.4.35\",
    \"tailwindcss\": \"^3.4.1\",
    \"typescript\": \"^5.5.3\",
    \"typescript-eslint\": \"^8.3.0\",
    \"vite\": \"^5.4.2\"
  }
}</designifyAction></designifyArtifact>`;
