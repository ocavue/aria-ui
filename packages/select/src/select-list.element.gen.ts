import { BaseElement } from "@aria-ui/core"

import { useSelectList } from "./select-list.state"

/**
 * A custom SelectList element.
 *
 * @group SelectList
 */
export class SelectListElement extends BaseElement {
  constructor() {
    super()
    useSelectList(this)
  }
}
