import { ReflectionKind, type Reflection } from "typedoc"
import {
  type MarkdownPageEvent,
  MarkdownTheme,
  MarkdownThemeContext,
  type MarkdownApplication,
} from "typedoc-plugin-markdown"

import { memberWithGroups } from "./particals/member.memberWithGroups"
import { signature } from "./particals/member.signature"

export function load(app: MarkdownApplication) {
  app.renderer.defineTheme("custom-theme", MyMarkdownTheme)
}

class MyMarkdownTheme extends MarkdownTheme {
  getRenderContext(
    page: MarkdownPageEvent<Reflection>,
  ): MyMarkdownThemeContext {
    return new MyMarkdownThemeContext(this, page, this.application.options)
  }
}

class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    const partials = this.partials
    const helpers = this.helpers

    this.partials = {
      ...partials,

      inheritance: () => "",

      accessor: () => "",

      hierarchy: () => "",

      signatureReturns: () => "",

      members: (...args) => {
        const output = partials.members(...args)
        return output.replaceAll("\n\n***\n\n", "\n\n")
      },

      memberWithGroups: bind(memberWithGroups, this),

      constructor: (...args): string => {
        const output = partials.constructor(...args)
        return output.replaceAll(/#+\s.*\n/g, "\n")
      },

      signature: bind(signature, this),

      typeParametersList: () => "",
    }

    this.helpers = {
      ...helpers,
      getKeyword: (kind: ReflectionKind) => {
        switch (kind) {
          case ReflectionKind.Function:
            return "function"
        }
        return helpers.getKeyword(kind) as string
      },
    }
  }
}

function bind<F, L extends unknown[], R>(fn: (f: F, ...a: L) => R, first: F) {
  return (...args: L) => fn(first, ...args)
}
