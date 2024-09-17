import { defineCustomElement } from "@aria-ui/core"

import { useSelectContent } from "./select-content.setup"
import { selectContentEvents, selectContentProps, type SelectContentEvents, type SelectContentProps } from "./select-content.types"

/**
 * A custom SelectContent element.
 *
 * @group SelectContent
 */
export class SelectContentElement extends defineCustomElement<
  SelectContentProps,
  SelectContentEvents
>({
  props: selectContentProps,
  events: selectContentEvents,
  setup: useSelectContent,
}) {}
