import { defineCustomElement } from "@aria-ui/core"

import { useTooltipContent } from "./tooltip-content.setup"
import {
  tooltipContentEvents,
  tooltipContentProps,
  type TooltipContentEvents,
  type TooltipContentProps,
} from "./tooltip-content.types"
import { useTooltipRoot } from "./tooltip-root.setup"
import {
  tooltipRootEvents,
  tooltipRootProps,
  type TooltipRootEvents,
  type TooltipRootProps,
} from "./tooltip-root.types"
import { useTooltipTrigger } from "./tooltip-trigger.setup"
import {
  tooltipTriggerEvents,
  tooltipTriggerProps,
  type TooltipTriggerEvents,
  type TooltipTriggerProps,
} from "./tooltip-trigger.types"

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

export * from "./tooltip-content.types"
export * from "./tooltip-content.setup"
export * from "./tooltip-root.types"
export * from "./tooltip-root.setup"
export * from "./tooltip-trigger.types"
export * from "./tooltip-trigger.setup"
