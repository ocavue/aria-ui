import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxEvents,
  listboxProps,
  type ListboxEvents,
  type ListboxProps,
} from "@aria-ui/listbox"

/**
 * @group SelectList
 * @internal
 */
export interface SelectListProps extends ListboxProps {}

/**
 * @group SelectList
 * @internal
 */
export const selectListProps: PropDeclarations<SelectListProps> = listboxProps

export interface SelectListEvents extends ListboxEvents {}

export const selectListEvents: EventDeclarations<SelectListEvents> =
  listboxEvents
