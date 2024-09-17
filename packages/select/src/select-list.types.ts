import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxEvents,
  listboxProps,
  type ListboxEvents,
  type ListboxProps,
} from "@aria-ui/listbox"

/**
 * @group SelectList
 */
export interface SelectListProps extends ListboxProps {}

/**
 * @internal
 */
export const selectListProps: PropDeclarations<SelectListProps> = listboxProps

/**
 * @group SelectList
 */
export interface SelectListEvents extends ListboxEvents {}

/**
 * @internal
 */
export const selectListEvents: EventDeclarations<SelectListEvents> =
  listboxEvents
