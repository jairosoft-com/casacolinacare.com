import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/'],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript configuration
  ...tsEslint.configs.recommended,

  // Prettier configuration (disables conflicting rules)
  eslintConfigPrettier,

  // Global settings for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
  },

  // React and Next.js configuration
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      prettier,
      unicorn,
    },
    rules: {
      // React rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed with Next.js
      'react/prop-types': 'off', // Using TypeScript

      // Next.js rules
      ...nextPlugin.configs.recommended.rules,

      // Import rules
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'error',
      'import/no-duplicates': 'warn',
      'import/no-cycle': 'warn',
      'import/first': 'warn',
      'import/newline-after-import': 'warn',

      // Simple import sort (auto-fixes import order)
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Prettier integration
      'prettier/prettier': 'warn',

      // Unicorn rules (opinionated best practices)
      'unicorn/prevent-abbreviations': 'off', // Too strict
      'unicorn/filename-case': 'off', // Next.js uses various cases
      'unicorn/no-null': 'off', // null is common in React
      'unicorn/prefer-module': 'off', // CommonJS is still used
      'unicorn/prefer-top-level-await': 'off', // Not always applicable
      'unicorn/no-array-reduce': 'off', // reduce is fine
      'unicorn/no-array-for-each': 'off', // forEach is fine
      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/better-regex': 'warn',
      'unicorn/catch-error-name': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/prefer-string-slice': 'warn',
      'unicorn/prefer-array-some': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },

  // Playwright E2E test configuration
  {
    files: ['tests/e2e/**/*.spec.ts', 'tests/e2e/**/*.spec.tsx'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error', // Prevent .only in commits
      'playwright/no-skipped-test': 'warn',
      'playwright/valid-expect': 'error',
      'playwright/prefer-web-first-assertions': 'warn',
      'playwright/no-wait-for-timeout': 'warn',
    },
  },
];
