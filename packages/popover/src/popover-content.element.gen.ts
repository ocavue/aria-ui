import { defineCustomElement } from "@aria-ui/core"

import { usePopoverContent } from "./popover-content.setup"
import { popoverContentEvents, popoverContentProps, type PopoverContentEvents, type PopoverContentProps } from "./popover-content.types"

/**
 * A custom PopoverContent element.
 *
 * @group PopoverContent
 */
export class PopoverContentElement extends defineCustomElement<
  PopoverContentProps,
  PopoverContentEvents
>({
  props: popoverContentProps,
  events: popoverContentEvents,
  setup: usePopoverContent,
}) {}
