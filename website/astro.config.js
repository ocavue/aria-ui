import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Aria UI",
      social: {
        github: "https://github.com/ocavue/aria-ui",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            {
              label: "Introduction",
              link: "/guides/introduction",
            },
          ],
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
})
