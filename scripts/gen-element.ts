import "./root"
import path from "node:path"
import assert from "node:assert"

import { camelCase, kebabCase, pascalCase } from "change-case"

import { listGitFiles } from "./list-git-files"

async function main() {
  const filePaths = await listGitFiles()

  const components = filePaths
    .filter((filePath) => filePath.endsWith(".setup.ts"))
    .map((filePath) => {
      const suffix = ".setup.ts"
      const componentName = filePath.slice(0, -suffix.length).split("/").pop()
      assert(componentName)

      const kebab = kebabCase(componentName)
      const pascal = pascalCase(componentName)
      const camel = camelCase(componentName)

      const dirPath = path.dirname(filePath)

      return { dirPath, componentName, kebab, pascal, camel }
    })

  const groupedComponents = Object.groupBy(
    components,
    (component) => component.dirPath,
  )

  for (const [dirPath, components] of Object.entries(groupedComponents)) {
    assert(components)
    const lines = [
      `import { registerCustomElement } from "@aria-ui/core"`,
      "",
      ...components.map(
        (c) => `import { ${c.pascal}Element } from "./${c.kebab}.element.gen"`,
      ),
      "",
      ...components.map((c) => `export * from "./${c.kebab}.types"`),
      "",
      ...components.map(
        (c) =>
          `registerCustomElement("aria-ui-${c.kebab}", ${c.pascal}Element)`,
      ),
      "",
    ]
    await Bun.write(path.join(dirPath, "index.ts"), lines.join("\n"))
  }

  for (const [dirPath, components] of Object.entries(groupedComponents)) {
    assert(components)
    const lines = [
      ...components.flatMap((c) => [
        `export * from "./${c.kebab}.types"`,
        `export * from "./${c.kebab}.setup"`,
        `export { ${c.pascal}Element } from "./${c.kebab}.element.gen"`,
        "",
      ]),
      "",
    ]
    await Bun.write(path.join(dirPath, "elements.ts"), lines.join("\n"))
  }

  for (const c of components) {
    const code = formatElementCode(c.componentName)
    await Bun.write(path.join(c.dirPath, `${c.kebab}.element.gen.ts`), code)
  }
}

function formatElementCode(name: string) {
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

await main()
