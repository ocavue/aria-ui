import { ElementBuilder } from "@aria-ui/core"

import { defaultTooltipRootProps, type TooltipRootProps } from "./tooltip-root.props"
import { useTooltipRoot } from "./tooltip-root.state"

/**
 * A custom TooltipRoot element.
 *
 * @group TooltipRoot
 */
export class TooltipRootElement extends ElementBuilder<TooltipRootProps>(
  useTooltipRoot,
  defaultTooltipRootProps,
) {}
