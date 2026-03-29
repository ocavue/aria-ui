// @ts-check

import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    markdown: true,
    command: true,
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
    ignores: ['**/*.md', '**/*.md/**/*'],
  },
  {
    ignores: ['packages/cli/bin/aria-ui.mjs'],
  },
)
