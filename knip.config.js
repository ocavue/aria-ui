// @ts-check

/**
 * @type {import('knip').KnipConfig}
 */
const config = {
  ignoreDependencies: ['@typescript/lib-dom', 'wrangler'],
  workspaces: {
    './website': {
      entry: ['src/stories/*.stories.ts', 'src/styles/tailwind.css'],
    },
  },
}

export default config
