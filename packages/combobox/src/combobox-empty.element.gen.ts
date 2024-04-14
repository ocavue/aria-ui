import { BaseElement } from "@aria-ui/core"

import { useComboboxEmpty } from "./combobox-empty.state"

/**
 * A custom ComboboxEmpty element.
 *
 * @group ComboboxEmpty
 */
export class ComboboxEmptyElement extends BaseElement {
  constructor() {
    super()
    useComboboxEmpty(this)
  }
}
