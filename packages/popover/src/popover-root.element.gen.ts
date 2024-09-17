import { defineCustomElement } from "@aria-ui/core"

import { usePopoverRoot } from "./popover-root.setup"
import { popoverRootEvents, popoverRootProps, type PopoverRootEvents, type PopoverRootProps } from "./popover-root.types"

/**
 * A custom PopoverRoot element.
 *
 * @group PopoverRoot
 */
export class PopoverRootElement extends defineCustomElement<
  PopoverRootProps,
  PopoverRootEvents
>({
  props: popoverRootProps,
  events: popoverRootEvents,
  setup: usePopoverRoot,
}) {}
