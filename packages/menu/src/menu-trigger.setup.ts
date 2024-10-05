import type { ConnectableElement } from "@aria-ui/core"
import { usePopoverTrigger } from "@aria-ui/popover/elements"

export function useMenuTrigger(element: ConnectableElement): void {
  usePopoverTrigger(element)
}
