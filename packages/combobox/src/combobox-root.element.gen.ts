import { ElementBuilder } from "@aria-ui/core"

import { defaultComboboxRootProps, type ComboboxRootProps } from "./combobox-root.props"
import { useComboboxRoot } from "./combobox-root.state"

/**
 * A custom ComboboxRoot element.
 *
 * @group ComboboxRoot
 */
export class ComboboxRootElement extends ElementBuilder<ComboboxRootProps>(
  useComboboxRoot,
  defaultComboboxRootProps,
) {}
