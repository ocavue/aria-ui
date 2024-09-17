import { defineCustomElement } from "@aria-ui/core"

import { useTooltipContent } from "./tooltip-content.setup"
import { tooltipContentEvents, tooltipContentProps, type TooltipContentEvents, type TooltipContentProps } from "./tooltip-content.types"

/**
 * A custom TooltipContent element.
 *
 * @group TooltipContent
 */
export class TooltipContentElement extends defineCustomElement<
  TooltipContentProps,
  TooltipContentEvents
>({
  props: tooltipContentProps,
  events: tooltipContentEvents,
  setup: useTooltipContent,
}) {}
