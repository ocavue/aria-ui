import { ElementBuilder } from "@aria-ui/core"

import { defaultComboboxItemProps, type ComboboxItemProps } from "./combobox-item.props"
import { useComboboxItem } from "./combobox-item.state"

/**
 * A custom ComboboxItem element.
 *
 * @group ComboboxItem
 */
export class ComboboxItemElement extends ElementBuilder<ComboboxItemProps>(
  useComboboxItem,
  defaultComboboxItemProps,
) {}
