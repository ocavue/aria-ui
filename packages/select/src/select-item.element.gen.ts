import { defineCustomElement } from "@aria-ui/core"

import { useSelectItem } from "./select-item.setup"
import { selectItemEvents, selectItemProps, type SelectItemEvents, type SelectItemProps } from "./select-item.types"

/**
 * A custom SelectItem element.
 *
 * @group SelectItem
 */
export class SelectItemElement extends defineCustomElement<
  SelectItemProps,
  SelectItemEvents
>({
  props: selectItemProps,
  events: selectItemEvents,
  setup: useSelectItem,
}) {}
