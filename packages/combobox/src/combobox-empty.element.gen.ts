import { ElementBuilder } from "@aria-ui/core"

import { comboboxEmptyProps, type ComboboxEmptyProps } from "./combobox-empty.props"
import { useComboboxEmpty } from "./combobox-empty.state"

/**
 * A custom ComboboxEmpty element.
 *
 * @group ComboboxEmpty
 */
export class ComboboxEmptyElement extends ElementBuilder<ComboboxEmptyProps>(
  useComboboxEmpty,
  comboboxEmptyProps,
) {}
