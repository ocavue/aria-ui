import { defineCustomElement } from "@aria-ui/core"

import { useComboboxItem } from "./combobox-item.setup"
import { comboboxItemEvents, comboboxItemProps, type ComboboxItemEvents, type ComboboxItemProps } from "./combobox-item.types"

/**
 * A custom ComboboxItem element.
 *
 * @group ComboboxItem
 */
export class ComboboxItemElement extends defineCustomElement<
  ComboboxItemProps,
  ComboboxItemEvents
>({
  props: comboboxItemProps,
  events: comboboxItemEvents,
  setup: useComboboxItem,
}) {}
