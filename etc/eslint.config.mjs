import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 0,
      'prettier/prettier': ['error', { printWidth: 120, semi: false }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    languageOptions: {
      globals: {
	document: 'readonly',
	window: 'readonly',
	console: 'readonly',
	setTimeout: 'readonly',
      }
    }
  }
)
