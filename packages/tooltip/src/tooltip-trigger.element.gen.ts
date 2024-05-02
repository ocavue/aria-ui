import { ElementMixin } from "@aria-ui/core"

import { defaultTooltipTriggerProps, type TooltipTriggerProps } from "./tooltip-trigger.props"
import { useTooltipTrigger } from "./tooltip-trigger.state"

/**
 * A custom TooltipTrigger element.
 *
 * @group TooltipTrigger
 */
export class TooltipTriggerElement extends ElementMixin<TooltipTriggerProps>(
  useTooltipTrigger,
  defaultTooltipTriggerProps,
) {}
