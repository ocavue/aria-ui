import "./root"
import fs from "node:fs/promises"
import path from "node:path"

import { $ } from "bun"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

async function main() {
  await $`typedoc`

  // Rename temp/typedoc/@aria-ui/*.md to temp/typedoc/@aria-ui/*/README.md
  const typedocDir = path.join(__dirname, "..", "temp/typedoc/@aria-ui")
  const entries = await fs.readdir(typedocDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const base = entry.name.replace(/\.md$/, "")
      const src = path.join(typedocDir, entry.name)
      const destDir = path.join(typedocDir, base)
      const dest = path.join(destDir, "README.md")
      await fs.mkdir(destDir, { recursive: true })
      await fs.rename(src, dest)
    }
  }

  await $`rsync -av ./temp/typedoc/@aria-ui/ ./packages/`

  await $`pnpm run fix:prettier`
}

await main()
