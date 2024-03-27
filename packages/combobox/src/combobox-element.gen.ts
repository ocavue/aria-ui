import { BaseElement } from "@aria-ui/core"

import { useCombobox } from "./combobox-state"

/**
 * A custom Combobox element.
 *
 * @group Combobox
 */
export class ComboboxElement extends BaseElement {
  constructor() {
    super()
    useCombobox(this)
  }
}