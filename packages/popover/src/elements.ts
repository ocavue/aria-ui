import { defineCustomElement } from "@aria-ui/core"

import { usePopoverContent } from "./popover-content.setup"
import {
  popoverContentEvents,
  popoverContentProps,
  type PopoverContentEvents,
  type PopoverContentProps,
} from "./popover-content.types"
import { usePopoverRoot } from "./popover-root.setup"
import {
  popoverRootEvents,
  popoverRootProps,
  type PopoverRootEvents,
  type PopoverRootProps,
} from "./popover-root.types"
import { usePopoverTrigger } from "./popover-trigger.setup"
import {
  popoverTriggerEvents,
  popoverTriggerProps,
  type PopoverTriggerEvents,
  type PopoverTriggerProps,
} from "./popover-trigger.types"

/**
 * A custom PopoverContent element.
 *
 * @group PopoverContent
 */
export class PopoverContentElement extends defineCustomElement<
  PopoverContentProps,
  PopoverContentEvents
>({
  props: popoverContentProps,
  events: popoverContentEvents,
  setup: usePopoverContent,
}) {}

/**
 * A custom PopoverRoot element.
 *
 * @group PopoverRoot
 */
export class PopoverRootElement extends defineCustomElement<
  PopoverRootProps,
  PopoverRootEvents
>({
  props: popoverRootProps,
  events: popoverRootEvents,
  setup: usePopoverRoot,
}) {}

/**
 * A custom PopoverTrigger element.
 *
 * @group PopoverTrigger
 */
export class PopoverTriggerElement extends defineCustomElement<
  PopoverTriggerProps,
  PopoverTriggerEvents
>({
  props: popoverTriggerProps,
  events: popoverTriggerEvents,
  setup: usePopoverTrigger,
}) {}

export * from "./popover-content.types"
export * from "./popover-content.setup"
export * from "./popover-root.types"
export * from "./popover-root.setup"
export * from "./popover-trigger.types"
export * from "./popover-trigger.setup"
