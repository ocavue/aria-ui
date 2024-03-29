import { BaseElement } from "@aria-ui/core"

import { useComboboxList } from "./combobox-list.state"

/**
 * A custom ComboboxList element.
 *
 * @group ComboboxList
 */
export class ComboboxListElement extends BaseElement {
  constructor() {
    super()
    useComboboxList(this)
  }
}
