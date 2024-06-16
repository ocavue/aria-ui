import { defineProject } from "vitest/config"

/** @type {import('vitest').UserWorkspaceConfig} */
const config = defineProject({
  test: {
    setupFiles: ["@aria-ui/config/vitest-setup"],
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
      headless: process.env.CI,
    },
  },
})

export { config }
