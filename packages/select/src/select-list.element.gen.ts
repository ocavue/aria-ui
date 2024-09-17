import { defineCustomElement } from "@aria-ui/core"

import { useSelectList } from "./select-list.setup"
import { selectListEvents, selectListProps, type SelectListEvents, type SelectListProps } from "./select-list.types"

/**
 * A custom SelectList element.
 *
 * @group SelectList
 */
export class SelectListElement extends defineCustomElement<
  SelectListProps,
  SelectListEvents
>({
  props: selectListProps,
  events: selectListEvents,
  setup: useSelectList,
}) {}
