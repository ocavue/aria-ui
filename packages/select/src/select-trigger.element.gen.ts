import { defineCustomElement } from "@aria-ui/core"

import { useSelectTrigger } from "./select-trigger.setup"
import { selectTriggerEvents, selectTriggerProps, type SelectTriggerEvents, type SelectTriggerProps } from "./select-trigger.types"

/**
 * A custom SelectTrigger element.
 *
 * @group SelectTrigger
 */
export class SelectTriggerElement extends defineCustomElement<
  SelectTriggerProps,
  SelectTriggerEvents
>({
  props: selectTriggerProps,
  events: selectTriggerEvents,
  setup: useSelectTrigger,
}) {}
