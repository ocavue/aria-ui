import { defineCustomElement } from "@aria-ui/core"

import { usePopoverTrigger } from "./popover-trigger.setup"
import { popoverTriggerEvents, popoverTriggerProps, type PopoverTriggerEvents, type PopoverTriggerProps } from "./popover-trigger.types"

/**
 * A custom PopoverTrigger element.
 *
 * @group PopoverTrigger
 */
export class PopoverTriggerElement extends defineCustomElement<
  PopoverTriggerProps,
  PopoverTriggerEvents
>({
  props: popoverTriggerProps,
  events: popoverTriggerEvents,
  setup: usePopoverTrigger,
}) {}
