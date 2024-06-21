import type { ConnectableElement } from "@aria-ui/core"
import { usePopoverTrigger } from "@aria-ui/popover"

/**
 * @group SelectTrigger
 * @hidden
 */
export function useSelectTrigger(element: ConnectableElement): void {
  usePopoverTrigger(element)
}
