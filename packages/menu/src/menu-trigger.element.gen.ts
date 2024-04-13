import { BaseElement } from "@aria-ui/core"

import { useMenuTrigger } from "./menu-trigger.state"

/**
 * A custom MenuTrigger element.
 *
 * @group MenuTrigger
 */
export class MenuTriggerElement extends BaseElement {
  constructor() {
    super()
    useMenuTrigger(this)
  }
}
