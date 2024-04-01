import type { ConnectableElement } from "@aria-ui/core"
import { usePopoverTrigger } from "@aria-ui/popover"

/**
 * @group SelectTrigger
 */
export function useSelectTrigger(element: ConnectableElement) {
  usePopoverTrigger(element)
}
