import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-require-imports': 0,
      'prettier/prettier': ['error', { printWidth: 120, semi: false }]
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
