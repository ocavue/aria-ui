import { defineConfig } from "astro/config"
import astrobook from "astrobook"

// https://astro.build/config
export default defineConfig({
  integrations: [astrobook({ directory: "src" })],
})
