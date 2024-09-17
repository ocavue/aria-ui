import { defineCustomElement } from "@aria-ui/core"

import { useListboxItem } from "./listbox-item.setup"
import { listboxItemEvents, listboxItemProps, type ListboxItemEvents, type ListboxItemProps } from "./listbox-item.types"

/**
 * A custom ListboxItem element.
 *
 * @group ListboxItem
 */
export class ListboxItemElement extends defineCustomElement<
  ListboxItemProps,
  ListboxItemEvents
>({
  props: listboxItemProps,
  events: listboxItemEvents,
  setup: useListboxItem,
}) {}
