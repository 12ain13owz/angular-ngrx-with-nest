/** @type {import('eslint').Linter.Config[]} */
import baseConfig from '../../eslint.config.mjs'
import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import security from 'eslint-plugin-security'
import tseslint from 'typescript-eslint'

export default [
  // Inherit base config
  ...baseConfig,

  // Ignore files and directories
  {
    ignores: [
      'node_modules/**',
      'dist/**/*',
      'build/**/*',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },

  // Target files to lint
  { files: ['src/**/*.{js,mjs,cjs,ts,tsx}', 'test/**/*.{js,mjs,cjs,ts,tsx}'] },

  // Language options for Node.js environment
  {
    languageOptions: {
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        sourceType: 'module', // Support ES Modules
        project: './tsconfig.json', // Enable type-aware linting
        tsconfigRootDir: import.meta.dirname, // Root directory for tsconfig
      },
    },
  },

  // JavaScript recommended rules
  pluginJs.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Type-aware rules for stricter TypeScript linting

  // Custom rules and plugins for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    plugins: {
      import: importPlugin,
      security,
      'no-unsanitized': noUnsanitized,
    },
    rules: {
      // General JavaScript rules
      'no-async-promise-executor': 'error', // Prevent unsafe Promise executor functions
      'no-throw-literal': 'error', // Disallow throwing literals
      'no-eval': 'error', // Disallow use of eval()
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Allow logging methods
      'no-process-env': 'off', // Allow process.env in NestJS (common for config)

      // Complexity control (adjusted for NestJS services/controllers)
      complexity: ['warn', { max: 20 }], // Higher complexity for NestJS methods

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error for flexibility
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow implicit return types
      '@typescript-eslint/require-await': 'off', // Allow async without await (common in NestJS)
      '@typescript-eslint/no-floating-promises': 'error', // Enforce promise handling
      '@typescript-eslint/no-misused-promises': 'error', // Prevent promise misuse

      // Security and sanitization
      'no-unsanitized/method': 'warn', // Warn on unsanitized methods
      'security/detect-object-injection': 'warn', // Warn on potential object injection
      'security/detect-non-literal-fs-filename': 'warn', // Warn on dynamic file paths
      'security/detect-unsafe-regex': 'error', // Detect ReDoS vulnerabilities

      // Import ordering (NestJS-specific)
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**', // Internal paths (if using path mapping)
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      // NestJS-specific best practices
      'import/no-cycle': 'warn', // Warn on circular dependencies
      'import/no-unused-modules': 'off', // Turn off as NestJS uses dependency injection
    },
  },

  // Custom rules for JavaScript files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    plugins: {
      security,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'security/detect-object-injection': 'warn',
    },
  },

  // Test files specific rules
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/test/**/*.ts', '**/__tests__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests for mocking
      'no-console': 'off', // Allow console in tests
      complexity: 'off', // Allow complex test cases
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow ! in tests for assertions
    },
  },
]
