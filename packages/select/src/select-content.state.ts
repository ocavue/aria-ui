import {
  assignProps,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import { usePopoverContent } from "@aria-ui/popover"

import {
  defaultSelectContentProps,
  type SelectContentProps,
} from "./select-content.props"

/**
 * @group SelectContent
 */
export function useSelectContent(
  element: ConnectableElement,
  props?: Partial<SelectContentProps>,
): SingalState<SelectContentProps> {
  return usePopoverContent(
    element,
    assignProps(defaultSelectContentProps, props),
  )
}
