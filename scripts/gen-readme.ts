import "./root"
import { $ } from "bun"

import { listGitFiles } from "./list-git-files"

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

  await $`rsync -av ./temp/typedoc/@aria-ui/ ./packages/`

  for (const filePath of await listReadmeFiles()) {
    await modifyReadmeFile(filePath)
  }
  await $`pnpm run fix:prettier`
  await $`pnpm run fix:biome`
}

await main()
