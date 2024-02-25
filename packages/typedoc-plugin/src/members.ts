import {
  ContainerReflection,
  DeclarationReflection,
  ReflectionCategory,
  ReflectionKind,
} from "typedoc"
import type { MarkdownThemeRenderContext } from "typedoc-plugin-markdown"

import { heading } from "./heading.js"

export function members(
  context: MarkdownThemeRenderContext,
  container: ContainerReflection,
  headingLevel: number,
): string {
  const md: string[] = []

  const pushCategories = (
    categories: ReflectionCategory[],
    headingLevel: number,
  ) => {
    categories
      ?.filter((category) => !category.allChildrenHaveOwnDocument())
      .forEach((item) => {
        md.push(heading(headingLevel, item.title))
        pushChildren(item.children, headingLevel + 1)
      })
  }

  const pushChildren = (
    children?: DeclarationReflection[],
    memberHeadingLevel?: number,
  ) => {
    const items = children?.filter((item) => !item.hasOwnDocument)
    items?.forEach((item, index) => {
      md.push(context.partials.member(item, memberHeadingLevel || headingLevel))
    })
  }

  if (container.categories?.length) {
    pushCategories(container.categories, headingLevel)
  } else {
    const containerKinds = [
      ReflectionKind.Project,
      ReflectionKind.Module,
      ReflectionKind.Namespace,
    ]
    if (
      context.options.getValue("excludeGroups") &&
      containerKinds.includes(container.kind)
    ) {
      if (container.categories?.length) {
        pushCategories(container.categories, headingLevel)
      } else {
        pushChildren(container.children, headingLevel)
      }
    } else {
      const groupsWithChildren = container.groups?.filter(
        (group) => !group.allChildrenHaveOwnDocument(),
      )
      groupsWithChildren?.forEach((group, index: number) => {
        if (group.categories) {
          md.push(
            heading(
              headingLevel,
              context.text.getTextFromKindString(group.title, true),
            ),
          )
          pushCategories(group.categories, headingLevel + 1)
        } else {
          const isPropertiesGroup = group.children.every(
            (child) => child.kind === ReflectionKind.Property,
          )

          const isEnumGroup = group.children.every(
            (child) => child.kind === ReflectionKind.EnumMember,
          )

          md.push(
            heading(
              headingLevel,
              context.text.getTextFromKindString(group.title, true),
            ),
          )

          if (
            isPropertiesGroup &&
            context.options.getValue("propertiesFormat") === "table"
          ) {
            md.push(
              context.partials.propertiesTable(
                group.children,
                context.text.getTextFromKindString(group.title, true) ===
                  context.text.getText("kind.event.plural"),
              ),
            )
          } else if (
            isEnumGroup &&
            context.options.getValue("enumMembersFormat") === "table"
          ) {
            md.push(context.partials.enumMembersTable(group.children))
          } else {
            pushChildren(group.children, headingLevel + 1)
          }
        }
      })
    }
  }

  return md.join("\n\n")
}
