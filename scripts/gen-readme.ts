import "./root"
import { $ } from "bun"

import { listGitFiles } from "./list-git-files"
import path from "path"
import fs from "fs/promises"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

async function listReadmeFiles() {
  const files = await listGitFiles()
  return files.filter((file) => file.includes("README.md"))
}

async function modifyReadmeFile(filePath: string) {
  const file = Bun.file(filePath)
  let text = await file.text()
  text = text.replaceAll(/^#+\s*TYPEDOC_REMOVE_PLACEHOLDER\s*$/gm, "")
  await Bun.write(file, text)
}

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

  // for (const filePath of await listReadmeFiles()) {
  //   await modifyReadmeFile(filePath)
  // }
  await $`pnpm run fix:prettier`
}

await main()
