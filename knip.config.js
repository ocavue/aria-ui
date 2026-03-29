// @ts-check

/**
 * @type {import('knip').KnipConfig}
 */
const config = {
  ignoreDependencies: ['@typescript/lib-dom'],
  workspaces: {
    './website': {
      entry: ['src/stories/*.stories.ts', 'src/styles/tailwind.css'],
    },
  },
}

export default config
