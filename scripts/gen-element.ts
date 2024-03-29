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
    const contextFilePath = path.join(dirPath, `${name}.context.gen.ts`)
    const stateFilePath = path.join(dirPath, `${name}.state.ts`)
    const propsFilePath = path.join(dirPath, `${name}.props.ts`)

    if (!filePaths.includes(stateFilePath)) {
      continue
    }

    let defaultProps: Record<string, unknown> = {}

    if (await Bun.file(propsFilePath).exists()) {
      const props = (await import(propsFilePath)) as Record<
        string,
        Record<string, unknown>
      >
      defaultProps = props[`default${pascalCase(name)}Props`] || {}
    }

    const elementCode = updateElementCode(name, defaultProps)
    await Bun.write(elementFilePath, elementCode)

    if (Object.keys(defaultProps).length > 0) {
      const contextCode = updateContextCode(name)
      await Bun.write(contextFilePath, contextCode)
    }
  }
}

function updateElementCode(
  name: string,
  defaultProps: Record<string, unknown>,
) {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

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

function updateContextCode(name: string) {
  const kebab = kebabCase(name)
  const pascal = pascalCase(name)

  const code = `
import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { default${pascal}Props, type ${pascal}Props } from "./${kebab}.props"

const context = createContext<Partial<${pascal}Props>>("${pascal}", {})

/**
 * @internal
 */
export function use${pascal}Props(
  element: ConnectableElement,
  props?: Partial<${pascal}Props>,
): SingalState<${pascal}Props> {
  return useProps(element, context, default${pascal}Props, props)
}

/**
 * Set the props for the child ${pascal} elements.
 * 
 * @internal
 *
 * @group ${pascal}
 */
export function use${pascal}PropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<${pascal}Props>>,
): void {
  usePropsProvider<${pascal}Props>(element, context, state)
}
`.trim()

  return `${code}\n`
}

void main()
