import { defineCustomElement } from "@aria-ui/core"

import { useComboboxList } from "./combobox-list.setup"
import { comboboxListEvents, comboboxListProps, type ComboboxListEvents, type ComboboxListProps } from "./combobox-list.types"

/**
 * A custom ComboboxList element.
 *
 * @group ComboboxList
 */
export class ComboboxListElement extends defineCustomElement<
  ComboboxListProps,
  ComboboxListEvents
>({
  props: comboboxListProps,
  events: comboboxListEvents,
  setup: useComboboxList,
}) {}
