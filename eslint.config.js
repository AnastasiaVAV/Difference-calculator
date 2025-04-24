import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    plugins: {
      '@stylistic': stylistic,
    },

    languageOptions: {
      globals: {
        ...globals.node, // Сохраните существующие глобальные переменные
        ...globals.jest, // Добавьте globals.jest
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@stylistic/semi': 'error',
      // '@stylistic/jsx-indent': 'error',
      // '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
