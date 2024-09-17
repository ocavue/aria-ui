import { defineCustomElement } from "@aria-ui/core"

import { useTooltipRoot } from "./tooltip-root.setup"
import { tooltipRootEvents, tooltipRootProps, type TooltipRootEvents, type TooltipRootProps } from "./tooltip-root.types"

/**
 * A custom TooltipRoot element.
 *
 * @group TooltipRoot
 */
export class TooltipRootElement extends defineCustomElement<
  TooltipRootProps,
  TooltipRootEvents
>({
  props: tooltipRootProps,
  events: tooltipRootEvents,
  setup: useTooltipRoot,
}) {}
