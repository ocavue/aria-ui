import { defineCustomElement } from "@aria-ui/core"

import { useComboboxRoot } from "./combobox-root.setup"
import { comboboxRootEvents, comboboxRootProps, type ComboboxRootEvents, type ComboboxRootProps } from "./combobox-root.types"

/**
 * A custom ComboboxRoot element.
 *
 * @group ComboboxRoot
 */
export class ComboboxRootElement extends defineCustomElement<
  ComboboxRootProps,
  ComboboxRootEvents
>({
  props: comboboxRootProps,
  events: comboboxRootEvents,
  setup: useComboboxRoot,
}) {}
