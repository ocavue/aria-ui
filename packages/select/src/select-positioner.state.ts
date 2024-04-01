import {
  assignProps,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { usePopoverPositioner } from "@aria-ui/popover"

import {
  defaultSelectPositionerProps,
  type SelectPositionerProps,
} from "./select-positioner.props"

/**
 * @group SelectPositioner
 */
export function useSelectPositioner(
  element: ConnectableElement,
  props?: Partial<SelectPositionerProps>,
): SingalState<SelectPositionerProps> {
  return usePopoverPositioner(
    element,
    assignProps(defaultSelectPositionerProps, props),
  )
}
