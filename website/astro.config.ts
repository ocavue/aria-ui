import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      title: 'aria-ui',
      homeContent: {
        subtitle: false,
        title: 'aria-ui',
        repo: { href: 'https://github.com/ocavue/aria-ui' },
        version: false,
      },
      css: ['./src/styles/tailwind.css'],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      conditions: ['aria-ui-source'],
    },
  },
})
