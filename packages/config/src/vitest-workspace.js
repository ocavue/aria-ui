import { defineProject } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"

const debug = !process.env.CI && !!process.env.debug

/**
 * @returns {import('vitest').UserWorkspaceConfig}
 */
function defineProjectConfig() {
  return defineProject({
    test: {
      setupFiles: ["@aria-ui/config/vitest-setup"],
      browser: {
        provider: playwright(),
        enabled: true,
        instances: [{ browser: "chromium" }],
        headless: !debug,
        ui: debug,
      },
    },
  })
}

export { defineProjectConfig }
