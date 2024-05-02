import { ElementMixin } from "@aria-ui/core"

import { defaultComboboxRootProps, type ComboboxRootProps } from "./combobox-root.props"
import { useComboboxRoot } from "./combobox-root.state"

/**
 * A custom ComboboxRoot element.
 *
 * @group ComboboxRoot
 */
export class ComboboxRootElement extends ElementMixin<ComboboxRootProps>(
  useComboboxRoot,
  defaultComboboxRootProps,
) {}
