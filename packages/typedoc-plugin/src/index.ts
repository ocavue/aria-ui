import {
  type DeclarationReflection,
  ReflectionKind,
  type Reflection,
} from "typedoc"
import {
  type MarkdownPageEvent,
  MarkdownTheme,
  MarkdownThemeRenderContext,
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
  ): MyMarkdownThemeRenderContext {
    return new MyMarkdownThemeRenderContext(
      this,
      page,
      this.application.options,
    )
  }
}

class MyMarkdownThemeRenderContext extends MarkdownThemeRenderContext {
  constructor(
    ...args: ConstructorParameters<typeof MarkdownThemeRenderContext>
  ) {
    super(...args)

    const partials = this.partials
    const helpers = this.helpers

    // // @ts-expect-error: TODO
    // const partials2 = Object.fromEntries(
    //   Object.entries({ ...partials }).map((key, func) => {
    //     return [
    //       key,
    //       func,
    //       // // @ts-expect-error: TODO
    //       // (...args) => {
    //       //   try {
    //       //     console.log("partials", key, args[0].name)
    //       //   } catch (error) {
    //       //     //
    //       //   }

    //       //   // @ts-expect-error: TODO
    //       //   const result = func(...args)
    //       //   return result
    //       // },
    //     ]
    //   }),
    // ) as typeof partials2

    const partials3 = Object.fromEntries(
      Object.entries({ ...partials }).map(([key, func]) => {
        if (typeof func === "function") {
          return [
            key,
            // @ts-expect-error: TODO
            (...args) => {
              try {
                console.log("partials", key, args[0].name)
              } catch (error) {
                //
              }

              // @ts-expect-error: TODO
              return func(...args)
            },
          ]
        }

        return [key, func]
      }),
    ) as typeof partials

    this.partials = {
      ...partials3,

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

      declarationsTable: (
        props: DeclarationReflection[],
        isEventProps = false,
      ) => {
        const inheritedFromValues = props.map((p) => p.inheritedFrom)
        for (const p of props) {
          p.inheritedFrom = undefined
        }
        const result = partials.declarationsTable(props, isEventProps)
        for (const [i, prop] of props.entries()) {
          prop.inheritedFrom = inheritedFromValues[i]
        }

        return result
      },

      typeDeclaration(model, headingLevel) {
        console.log("typeDeclaration")

        const output = partials.typeDeclaration(model, headingLevel)
        return output
      },

      declaration(model, options) {
        console.log("declaration", model.name)

        const output = partials.declaration(model, options)
        return output
      },
    }

    this.helpers = {
      ...helpers,
      getKeyword: (kind: ReflectionKind) => {
        if (kind === ReflectionKind.Function) {
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
