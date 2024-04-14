import { BaseElement } from "@aria-ui/core"

import { useListboxEmpty } from "./listbox-empty.state"

/**
 * A custom ListboxEmpty element.
 *
 * @group ListboxEmpty
 */
export class ListboxEmptyElement extends BaseElement {
  constructor() {
    super()
    useListboxEmpty(this)
  }
}
