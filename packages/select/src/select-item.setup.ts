import type { ConnectableElement, SetupOptions } from "@aria-ui/core"
import { useListboxItem } from "@aria-ui/listbox/elements"

import type { SelectItemEvents, SelectItemProps } from "./select-item.types"

/**
 * @group SelectItem
 * @hidden
 */
export function useSelectItem(
  element: ConnectableElement,
  options: SetupOptions<SelectItemProps, SelectItemEvents>,
): void {
  useListboxItem(element, options)
}
