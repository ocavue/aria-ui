import type { ConnectableElement } from "@aria-ui/core"
import { usePopoverTrigger } from "@aria-ui/popover"

export function useMenuTrigger(element: ConnectableElement) {
  usePopoverTrigger(element)
}
