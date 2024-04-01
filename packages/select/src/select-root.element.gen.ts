import { BaseElement } from "@aria-ui/core"

import { useSelectRoot } from "./select-root.state"

/**
 * A custom SelectRoot element.
 *
 * @group SelectRoot
 */
export class SelectRootElement extends BaseElement {
  constructor() {
    super()
    useSelectRoot(this)
  }
}
