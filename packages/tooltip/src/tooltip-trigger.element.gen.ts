import { defineCustomElement } from "@aria-ui/core"

import { useTooltipTrigger } from "./tooltip-trigger.setup"
import { tooltipTriggerEvents, tooltipTriggerProps, type TooltipTriggerEvents, type TooltipTriggerProps } from "./tooltip-trigger.types"

/**
 * A custom TooltipTrigger element.
 *
 * @group TooltipTrigger
 */
export class TooltipTriggerElement extends defineCustomElement<
  TooltipTriggerProps,
  TooltipTriggerEvents
>({
  props: tooltipTriggerProps,
  events: tooltipTriggerEvents,
  setup: useTooltipTrigger,
}) {}
