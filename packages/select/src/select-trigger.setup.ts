import type { ConnectableElement } from "@aria-ui/core"
import { usePopoverTrigger } from "@aria-ui/popover/elements"

/**
 * @group SelectTrigger
 * @hidden
 */
export function useSelectTrigger(element: ConnectableElement): void {
  usePopoverTrigger(element)
}
