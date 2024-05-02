import { ElementMixin } from "@aria-ui/core"

import { defaultPopoverRootProps, type PopoverRootProps } from "./popover-root.props"
import { usePopoverRoot } from "./popover-root.state"

/**
 * A custom PopoverRoot element.
 *
 * @group PopoverRoot
 */
export class PopoverRootElement extends ElementMixin<PopoverRootProps>(
  usePopoverRoot,
  defaultPopoverRootProps,
) {}
