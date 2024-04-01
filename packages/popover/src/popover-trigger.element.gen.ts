import { BaseElement } from "@aria-ui/core"

import { usePopoverTrigger } from "./popover-trigger.state"

/**
 * A custom PopoverTrigger element.
 *
 * @group PopoverTrigger
 */
export class PopoverTriggerElement extends BaseElement {
  constructor() {
    super()
    usePopoverTrigger(this)
  }
}
