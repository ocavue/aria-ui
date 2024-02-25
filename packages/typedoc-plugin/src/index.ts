import {
  type DeclarationReflection,
  type Reflection,
  SignatureReflection,
} from "typedoc"
import {
  type MarkdownApplication,
  MarkdownPageEvent,
  MarkdownTheme,
  MarkdownThemeRenderContext,
} from "typedoc-plugin-markdown"

import { members } from "./members.js"

export function load(app: MarkdownApplication) {
  app.renderer.defineTheme("custom-theme", MyMarkdownTheme)
}

class MyMarkdownTheme extends MarkdownTheme {
  getRenderContext(
    page: MarkdownPageEvent<Reflection> | null,
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

    this.partials = {
      ...partials,

      inheritance: () => "",

      accessorMember: () => "",

      memberHierarchy: () => "",

      signatureMemberReturns: () => "",

      members: bind(members, this),

      // declarationMember: bind(declarationMember, this),

      constructorMember: (
        reflection: DeclarationReflection,
        headingLevel: number,
      ): string => {
        const md: string[] = []
        for (const signature of reflection.signatures ?? []) {
          md.push(this.partials.signatureMember(signature, headingLevel))
        }
        return md.join("\n\n")
      },

      signatureMember: bind(signatureMember, this),

      typeParametersList: () => "",

      reflectionMember: (
        reflection: DeclarationReflection,
        headingLevel: number,
      ) => {
        const implementedTypes = reflection.implementedTypes
        const typeParameters = reflection.typeParameters
        reflection.implementedTypes = undefined
        // reflection.typeParameters = undefined
        const result = partials.reflectionMember(reflection, headingLevel)
        reflection.implementedTypes = implementedTypes
        reflection.typeParameters = typeParameters
        return result
      },

      propertiesTable: (
        props: DeclarationReflection[],
        isEventProps = false,
      ) => {
        const inheritedFromValues = props.map((p) => p.inheritedFrom)
        for (const p of props) {
          p.inheritedFrom = undefined
        }
        const result = partials.propertiesTable(props, isEventProps)
        for (const [i, prop] of props.entries()) {
          prop.inheritedFrom = inheritedFromValues[i]
        }

        return [
          "<!-- prettier-ignore-start -->",
          result,
          "<!-- prettier-ignore-end -->",
        ].join("\n\n")
      },
    }
  }
}

function bind<F, L extends unknown[], R>(fn: (f: F, ...a: L) => R, first: F) {
  return (...args: L) => fn(first, ...args)
}

export function signatureMember(
  context: MarkdownThemeRenderContext,
  signature: SignatureReflection,
  headingLevel: number,
  nested = false,
  accessor?: string,
): string {
  const md: string[] = []

  md.push(context.partials.reflectionFlags(signature))

  if (!nested) {
    md.push(
      context.partials.signatureMemberIdentifier(signature, {
        accessor,
      }),
    )
  }

  if (signature.comment) {
    md.push(
      context.partials.comment(signature.comment, headingLevel, true, false),
    )
  }

  if (signature.type) {
    md.push(context.partials.signatureMemberReturns(signature, headingLevel))
  }

  md.push(context.partials.inheritance(signature, headingLevel))

  if (signature.comment) {
    md.push(
      context.partials.comment(signature.comment, headingLevel, false, true),
    )
  }

  if (
    !nested &&
    signature.sources &&
    !context.options.getValue("disableSources")
  ) {
    md.push(context.partials.sources(signature, headingLevel))
  }

  return md.join("\n\n")
}
