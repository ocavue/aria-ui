import "./root"
import path from "node:path"

import { kebabCase, pascalCase } from "change-case"

import { listGitFiles } from "./list-git-files"

async function main() {
  const filePaths = await listGitFiles()

  for (const filePath of filePaths) {
    const suffix = ".element.gen.ts"

    if (!filePath.endsWith(suffix)) {
      continue
    }

    const name = filePath.slice(0, -suffix.length).split("/").pop()

    if (!name) {
      continue
    }

    const dirPath = path.dirname(filePath)
    const elementFilePath = path.join(dirPath, name + suffix)
    const stateFilePath = path.join(dirPath, `${name}.state.ts`)

    if (!filePaths.includes(stateFilePath)) {
      continue
    }

    const elementCode = updateElementCode(name)
    await Bun.write(elementFilePath, elementCode)
  }
}

function updateElementCode(name: string) {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

  const code = `

import { ElementMixin } from "@aria-ui/core"

import { default${pascal}Props, type ${pascal}Props } from "./${kebab}.props"
import { use${pascal} } from "./${kebab}.state"

/**
 * A custom ${pascal} element.
 *
 * @group ${pascal}
 */
export class ${pascal}Element extends ElementMixin<${pascal}Props>(
  use${pascal},
  default${pascal}Props,
) {}


`.trim()

  return `${code}\n`
}

void main()
