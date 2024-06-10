import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    setupFiles: ["./vitest-setup.ts"],
    browser: {
      enabled: true,
      provider: "playwright",
      name: "chromium",
      headless: true,
    },
  },
})
