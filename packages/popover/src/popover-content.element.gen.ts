import { ElementBuilder } from "@aria-ui/core"

import { defaultPopoverContentProps, type PopoverContentProps } from "./popover-content.props"
import { usePopoverContent } from "./popover-content.state"

/**
 * A custom PopoverContent element.
 *
 * @group PopoverContent
 */
export class PopoverContentElement extends ElementBuilder<PopoverContentProps>(
  usePopoverContent,
  defaultPopoverContentProps,
) {}
