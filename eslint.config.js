import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import reactRefresh from 'eslint-plugin-react-refresh'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended'),
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['scripts/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      // Vite's automatic JSX runtime means React doesn't need to be in scope
      'react/react-in-jsx-scope': 'off',
      // This codebase doesn't use prop-types
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // One-off Node scripts (e.g. the image-compression tool), not app code
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
]
