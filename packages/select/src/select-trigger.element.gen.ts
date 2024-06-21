import { ElementBuilder } from "@aria-ui/core"

import { defaultSelectTriggerProps, type SelectTriggerProps } from "./select-trigger.props"
import { useSelectTrigger } from "./select-trigger.state"

/**
 * A custom SelectTrigger element.
 *
 * @group SelectTrigger
 */
export class SelectTriggerElement extends ElementBuilder<SelectTriggerProps>(
  useSelectTrigger,
  defaultSelectTriggerProps,
) {}
