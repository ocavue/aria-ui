import path from "node:path"

import { $, type ShellOutput } from "bun"

const root = path.join(__dirname, "..")
process.chdir(root)

function getLines(output: ShellOutput): string[] {
  return output
    .text()
    .split("\n")
    .filter((line) => line.trim())
}

async function getReadmeFilePaths() {
  return getLines(await $`git ls-files | grep 'README.md'`).map((line) =>
    path.join(root, line),
  )
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

  for (const filePath of await getReadmeFilePaths()) {
    await modifyReadmeFile(filePath)
  }
  await $`bun run fix:prettier`
}

void main()
