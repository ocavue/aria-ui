import "./root"
import path from "node:path"

import { GlobalRegistrator } from "@happy-dom/global-registrator"
import { kebabCase, pascalCase } from "change-case"

import { listGitFiles } from "./list-git-files"

GlobalRegistrator.register()

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
    const propsFilePath = path.join(dirPath, `${name}.props.ts`)

    if (!filePaths.includes(stateFilePath)) {
      continue
    }

    const code = await updateElementCode(name, propsFilePath)
    await Bun.write(elementFilePath, code)
  }
}

async function updateElementCode(
  name: string,

  propsFilePath: string,
) {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

  let defaultProps: Record<string, unknown> = {}

  if (await Bun.file(propsFilePath).exists()) {
    const props = (await import(propsFilePath)) as Record<
      string,
      Record<string, unknown>
    >
    defaultProps = props[`default${pascalCase(name)}Props`] || {}
  }

  const hasProps = Object.keys(defaultProps).length > 0

  const propsCode = Object.keys(defaultProps)
    .map(
      (prop) => `
  /** @hidden */ get ${prop}(): ${pascal}Props["${prop}"] { return this._s.${prop}.value }
  /** @hidden */ set ${prop}(v: ${pascal}Props["${prop}"]) { this._s.${prop}.value = v }`,
    )
    .join("")

  const commnet = [
    ` * A custom ${pascal} element.`,
    hasProps ? ` * Properties: {@link ${pascal}Props}` : "",
    ` * @group ${pascal}`,
  ]
    .filter(Boolean)
    .join("\n *\n")

  const code = hasProps
    ? `
import { BaseElement, type SingalState } from "@aria-ui/core";

import type { ${pascal}Props } from "./${kebab}.props"
import { use${pascal} } from "./${kebab}.state"

/**
${commnet}
 */
export class ${pascal}Element extends BaseElement implements ${pascal}Props {
  private _s: SingalState<${pascal}Props>;

  constructor(props?: Partial<${pascal}Props>) {
    super();
    this._s = use${pascal}(this, props);
  }
${propsCode}
}
`.trim()
    : `
import { BaseElement } from "@aria-ui/core"

import { use${pascal} } from "./${kebab}.state"

/**
${commnet}
 */
export class ${pascal}Element extends BaseElement {
  constructor() {
    super()
    use${pascal}(this)
  }
}
`.trim()

  return `${code}\n`
}

void main()
