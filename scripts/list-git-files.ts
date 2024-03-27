import path from "node:path"

import { $ } from "bun"

import { root } from "./root"

export async function listGitFiles() {
  const output =
    await $`git ls-files --cached --others --exclude-standard`.throws(true)
  return output
    .text()
    .split("\n")
    .filter((line) => line.trim())
    .map((file) => path.join(root, file))
}
