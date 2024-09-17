import "./root"
import path from "node:path"

import { camelCase, kebabCase, pascalCase } from "change-case"

import { listGitFiles } from "./list-git-files"

async function main() {
  const filePaths = await listGitFiles()
  const exportMap: Record<string, Array<[number, string]>> = {}

  for (const filePath of filePaths) {
    const suffix = ".setup.ts"

    if (!filePath.endsWith(suffix)) {
      continue
    }

    const name = filePath.slice(0, -suffix.length).split("/").pop()

    if (!name) {
      continue
    }

    const dirPath = path.dirname(filePath)
    const elementFilePath = path.join(dirPath, `${name}.element.gen.ts`)

    const elementCode = updateElementCode(name)
    await Bun.write(elementFilePath, elementCode)

    const indexPath = path.join(dirPath, "index.ts")
    const indexLines = updateIndexCode(name)
    exportMap[indexPath] = (
      exportMap[indexPath] || [
        [0, "import { registerCustomElement } from '@aria-ui/core';"],
      ]
    ).concat(indexLines)

    const elementsPath = path.join(dirPath, "elements.ts")
    const elementsCode = updateElementsCode(name)
    exportMap[elementsPath] = (exportMap[elementsPath] || []).concat(
      elementsCode,
    )
  }

  for (const [filePath, lines] of Object.entries(exportMap)) {
    const sortedLines = lines.sort((a, b) => a[0] - b[0])
    const code = sortedLines.map((line) => line[1]).join("\n")
    await Bun.write(filePath, code)
  }
}

function updateElementCode(name: string) {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)
  const camel = camelCase(name)

  const code = `
import { defineCustomElement } from "@aria-ui/core"

import { use${pascal} } from "./${kebab}.setup"
import { ${camel}Events, ${camel}Props, type ${pascal}Events, type ${pascal}Props } from "./${kebab}.types"

/**
 * A custom ${pascal} element.
 *
 * @group ${pascal}
 */
export class ${pascal}Element extends defineCustomElement<
  ${pascal}Props,
  ${pascal}Events
>({
  props: ${camel}Props,
  events: ${camel}Events,
  setup: use${pascal},
}) {}
`.trim()

  return `${code}\n`
}

function updateIndexCode(name: string): Array<[number, string]> {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

  return [
    [1, `import { ${pascal}Element } from "./${kebab}.element.gen";`],
    [2, `export * from "./${kebab}.types";`],
    [3, `registerCustomElement("aria-ui-${kebab}", ${pascal}Element);`],
  ]
}

function updateElementsCode(name: string): Array<[number, string]> {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

  return [
    [1, `export * from "./${kebab}.types";`],
    [1, `export * from "./${kebab}.setup";`],
    [1, `export { ${pascal}Element } from "./${kebab}.element.gen";`],
  ]
}

await main()
