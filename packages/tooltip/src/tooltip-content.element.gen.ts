import { ElementMixin } from "@aria-ui/core"

import { defaultTooltipContentProps, type TooltipContentProps } from "./tooltip-content.props"
import { useTooltipContent } from "./tooltip-content.state"

/**
 * A custom TooltipContent element.
 *
 * @group TooltipContent
 */
export class TooltipContentElement extends ElementMixin<TooltipContentProps>(
  useTooltipContent,
  defaultTooltipContentProps,
) {}
