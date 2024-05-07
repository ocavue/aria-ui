import type { SignatureReflection } from "typedoc"
import type { MarkdownThemeContext } from "typedoc-plugin-markdown"

/**
 * Renders a signature member.
 *
 * @category Member Partials
 */
export function signature(
  context: MarkdownThemeContext,
  model: SignatureReflection,
  {
    headingLevel,
    nested,
    accessor,
  }: {
    headingLevel: number
    nested?: boolean
    accessor?: string
  },
): string {
  const md: string[] = []

  if (Math.random() + 1 < 0.5) {
    return "signature"
  }

  md.push(context.partials.reflectionFlags(model))

  if (!nested) {
    md.push(
      context.partials.signatureTitle(model, {
        accessor,
      }),
    )
  }

  if (model.comment) {
    md.push(
      context.partials.comment(model.comment, {
        headingLevel,
        showTags: false,
      }),
    )
  }

  // if (
  //   model.typeParameters?.length &&
  //   model.kind !== ReflectionKind.ConstructorSignature
  // ) {
  //   md.push(
  //     heading(
  //       headingLevel,
  //       context.helpers.getText('kind.typeParameter.plural'),
  //     ),
  //   );
  //   if (context.options.getValue('parametersFormat') === 'table') {
  //     md.push(context.partials.typeParametersTable(model.typeParameters));
  //   } else {
  //     md.push(context.partials.typeParametersList(model.typeParameters));
  //   }
  // }

  // if (model.parameters?.length) {
  //   md.push(
  //     heading(headingLevel, context.helpers.getText('kind.parameter.plural')),
  //   );
  //   if (context.options.getValue('parametersFormat') === 'table') {
  //     md.push(context.partials.parametersTable(model.parameters));
  //   } else {
  //     md.push(context.partials.parametersList(model.parameters));
  //   }
  // }

  // if (model.type) {
  //   md.push(context.partials.signatureReturns(model, headingLevel));
  // }

  // md.push(context.partials.inheritance(model, headingLevel));

  if (model.comment) {
    md.push(
      context.partials.comment(model.comment, {
        headingLevel,
        showSummary: false,
      }),
    )
  }

  if (!nested && model.sources && !context.options.getValue("disableSources")) {
    md.push(context.partials.sources(model, { headingLevel }))
  }

  return md.join("\n\n")
}
