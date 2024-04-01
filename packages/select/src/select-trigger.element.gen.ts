import { BaseElement } from "@aria-ui/core"

import { useSelectTrigger } from "./select-trigger.state"

/**
 * A custom SelectTrigger element.
 *
 * @group SelectTrigger
 */
export class SelectTriggerElement extends BaseElement {
  constructor() {
    super()
    useSelectTrigger(this)
  }
}
