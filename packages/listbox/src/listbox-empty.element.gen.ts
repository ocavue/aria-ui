import { defineCustomElement } from "@aria-ui/core"

import { useListboxEmpty } from "./listbox-empty.setup"
import { listboxEmptyEvents, listboxEmptyProps, type ListboxEmptyEvents, type ListboxEmptyProps } from "./listbox-empty.types"

/**
 * A custom ListboxEmpty element.
 *
 * @group ListboxEmpty
 */
export class ListboxEmptyElement extends defineCustomElement<
  ListboxEmptyProps,
  ListboxEmptyEvents
>({
  props: listboxEmptyProps,
  events: listboxEmptyEvents,
  setup: useListboxEmpty,
}) {}
