import type { ConnectableElement, SignalState } from "@aria-ui/core"
import { usePopoverContent } from "@aria-ui/popover"

import type { SelectContentProps } from "./select-content.props"

/**
 * @group SelectContent
 * @hidden
 */
export function useSelectContent(
  element: ConnectableElement,
  state: SignalState<SelectContentProps>,
): void {
  usePopoverContent(element, state)
}
