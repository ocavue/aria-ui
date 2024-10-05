import type { ConnectableElement, SetupOptions } from "@aria-ui/core"
import { usePopoverContent } from "@aria-ui/popover/elements"

import type {
  SelectContentEvents,
  SelectContentProps,
} from "./select-content.types"

/**
 * @group SelectContent
 * @hidden
 */
export function useSelectContent(
  element: ConnectableElement,
  options: SetupOptions<SelectContentProps, SelectContentEvents>,
): void {
  usePopoverContent(element, options)
}
