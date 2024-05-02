import { ElementMixin } from "@aria-ui/core"

import { defaultComboboxListProps, type ComboboxListProps } from "./combobox-list.props"
import { useComboboxList } from "./combobox-list.state"

/**
 * A custom ComboboxList element.
 *
 * @group ComboboxList
 */
export class ComboboxListElement extends ElementMixin<ComboboxListProps>(
  useComboboxList,
  defaultComboboxListProps,
) {}
