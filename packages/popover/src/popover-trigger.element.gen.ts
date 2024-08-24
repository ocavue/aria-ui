import { ElementBuilder } from "@aria-ui/core"

import { popoverTriggerProps, type PopoverTriggerProps } from "./popover-trigger.props"
import { usePopoverTrigger } from "./popover-trigger.state"

/**
 * A custom PopoverTrigger element.
 *
 * @group PopoverTrigger
 */
export class PopoverTriggerElement extends ElementBuilder<PopoverTriggerProps>(
  usePopoverTrigger,
  popoverTriggerProps,
) {}
