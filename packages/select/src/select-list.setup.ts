import {
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from "@aria-ui/core"
import { useListbox, type ListboxEvents } from "@aria-ui/listbox/elements"

import type { SelectListProps } from "./select-list.types"
import { selectedValueContext } from "./select-root.context"

/**
 * @group SelectList
 * @hidden
 */
export function useSelectList(
  element: ConnectableElement,
  options: SetupOptions<SelectListProps, ListboxEvents>,
): void {
  const selectedValue = selectedValueContext.consume(element)

  useEffect(element, () => {
    selectedValue.set(options.state.value.get())
  })

  useListbox(element, options)
}
