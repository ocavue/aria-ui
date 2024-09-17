import { defineCustomElement } from "@aria-ui/core"

import { useComboboxEmpty } from "./combobox-empty.setup"
import { comboboxEmptyEvents, comboboxEmptyProps, type ComboboxEmptyEvents, type ComboboxEmptyProps } from "./combobox-empty.types"

/**
 * A custom ComboboxEmpty element.
 *
 * @group ComboboxEmpty
 */
export class ComboboxEmptyElement extends defineCustomElement<
  ComboboxEmptyProps,
  ComboboxEmptyEvents
>({
  props: comboboxEmptyProps,
  events: comboboxEmptyEvents,
  setup: useComboboxEmpty,
}) {}
