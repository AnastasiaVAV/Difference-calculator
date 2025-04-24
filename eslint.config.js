import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
// import eslintPluginJest from 'eslint-plugin-jest';

export default defineConfig([
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    plugins: {
      '@stylistic': stylistic,
      // jest: eslintPluginJest,
    },
    // extends: ['plugin:jest/recommended'],
    // "env": {
    //     jest: true
    // },
    languageOptions: {
      // globals: globals.node,
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
      // '@stylistic/semi': 'error',
      // '@stylistic/jsx-indent': 'error',
      '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'off',
      // "jest/no-disabled-tests": "warn",
      // "jest/no-focused-tests": "error",
      // "jest/no-identical-title": "error",
      // "jest/prefer-to-have-length": "warn",
      // "jest/valid-expect": "error"
    },
  },
]);
