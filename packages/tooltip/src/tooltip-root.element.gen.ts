import { ElementMixin } from "@aria-ui/core"

import { defaultTooltipRootProps, type TooltipRootProps } from "./tooltip-root.props"
import { useTooltipRoot } from "./tooltip-root.state"

/**
 * A custom TooltipRoot element.
 *
 * @group TooltipRoot
 */
export class TooltipRootElement extends ElementMixin<TooltipRootProps>(
  useTooltipRoot,
  defaultTooltipRootProps,
) {}
