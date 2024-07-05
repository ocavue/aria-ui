import type { SignatureReflection } from "typedoc"
import type { MarkdownThemeContext } from "typedoc-plugin-markdown"

export function signature(
  context: MarkdownThemeContext,
  model: SignatureReflection,
  options: {
    headingLevel: number
    nested?: boolean
    accessor?: string
    multipleSignatures?: boolean
  },
): string {
  const md: string[] = []

  if (!options.nested) {
    md.push(
      context.partials.signatureTitle(model, {
        accessor: options.accessor,
      }),
    )
  }

  const modelComments = model.comment || model.parent?.comment

  if (modelComments) {
    md.push(
      context.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showTags: false,
      }),
    )
  }

  // if (!options.multipleSignatures && model.parent?.documents) {
  //   md.push(
  //     this.partials.documents(model?.parent, {
  //       headingLevel: options.headingLevel,
  //     }),
  //   )
  // }

  // if (
  //   model.typeParameters?.length &&
  //   model.kind !== ReflectionKind.ConstructorSignature
  // ) {
  //   md.push(
  //     heading(
  //       options.headingLevel,
  //       this.internationalization.kindPluralString(
  //         ReflectionKind.TypeParameter,
  //       ),
  //     ),
  //   )
  //   if (this.helpers.useTableFormat("parameters")) {
  //     md.push(this.partials.typeParametersTable(model.typeParameters))
  //   } else {
  //     md.push(this.partials.typeParametersList(model.typeParameters))
  //   }
  // }

  // if (model.parameters?.length) {
  //   md.push(
  //     heading(
  //       options.headingLevel,
  //       this.internationalization.kindPluralString(ReflectionKind.Parameter),
  //     ),
  //   )
  //   if (this.helpers.useTableFormat("parameters")) {
  //     md.push(this.partials.parametersTable(model.parameters))
  //   } else {
  //     md.push(this.partials.parametersList(model.parameters))
  //   }
  // }

  // if (model.type) {
  //   md.push(
  //     this.partials.signatureReturns(model, {
  //       headingLevel: options.headingLevel,
  //     }),
  //   )
  // }

  if (modelComments) {
    md.push(
      context.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showSummary: false,
      }),
    )
  }

  md.push(
    context.partials.inheritance(model, { headingLevel: options.headingLevel }),
  )

  if (
    !options.nested &&
    model.sources &&
    !context.options.getValue("disableSources")
  ) {
    md.push(
      context.partials.sources(model, { headingLevel: options.headingLevel }),
    )
  }

  return md.join("\n\n")
}
