import { defineCustomElement } from "@aria-ui/core"

import { useListbox } from "./listbox.setup"
import { listboxEvents, listboxProps, type ListboxEvents, type ListboxProps } from "./listbox.types"

/**
 * A custom Listbox element.
 *
 * @group Listbox
 */
export class ListboxElement extends defineCustomElement<
  ListboxProps,
  ListboxEvents
>({
  props: listboxProps,
  events: listboxEvents,
  setup: useListbox,
}) {}
