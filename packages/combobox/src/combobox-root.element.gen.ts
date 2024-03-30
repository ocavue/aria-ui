import { BaseElement } from "@aria-ui/core"

import { useComboboxRoot } from "./combobox-root.state"

/**
 * A custom ComboboxRoot element.
 *
 * @group ComboboxRoot
 */
export class ComboboxRootElement extends BaseElement {
  constructor() {
    super()
    useComboboxRoot(this)
  }
}
