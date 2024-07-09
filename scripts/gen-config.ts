import path from "node:path"

import CommentJSON from "comment-json"

import { listGitFiles } from "./list-git-files"
import { root } from "./root"

async function genRootTypedoc() {
  const files = await listGitFiles()
  const rootTypedocPath = path.join(root, "typedoc.json")
  const rootTypedocConfig = CommentJSON.parse(
    await Bun.file(rootTypedocPath).text(),
    // biome-ignore lint/suspicious/noExplicitAny: allow any
  ) as any
  rootTypedocConfig.entryPoints = files
    .map((filePath) => path.relative(root, filePath))
    .filter((filePath) => filePath.endsWith("typedoc.json"))
    .filter((filePath) => filePath !== "typedoc.json")
    .map((filePath) => path.dirname(filePath))
    .sort()
  await Bun.write(
    rootTypedocPath,
    CommentJSON.stringify(rootTypedocConfig, null, 2),
  )
}

async function genRootTsconfig() {
  const files = await listGitFiles()
  const rootTsconfigPath = path.join(root, "tsconfig.json")
  const rootTsconfigConfig = CommentJSON.parse(
    await Bun.file(rootTsconfigPath).text(),
    // biome-ignore lint/suspicious/noExplicitAny: allow any
  ) as any
  rootTsconfigConfig.references = files
    .map((filePath) => path.relative(root, filePath))
    .filter((filePath) => filePath.endsWith("tsconfig.json"))
    .filter((filePath) => filePath !== "tsconfig.json")
    .map((filePath) => path.dirname(filePath))
    .sort()
    .map((dirPath) => ({ path: dirPath }))
  await Bun.write(
    rootTsconfigPath,
    CommentJSON.stringify(rootTsconfigConfig, null, 2),
  )
}

async function main() {
  await genRootTypedoc()
  await genRootTsconfig()
}

await main()
