import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxItemEvents,
  listboxItemProps,
  type ListboxItemEvents,
  type ListboxItemProps,
} from "@aria-ui/listbox"

/**
 * @group SelectItem
 * @hidden
 */
export interface SelectItemProps extends ListboxItemProps {}

/**
 * @group SelectList
 *
 * @internal
 */
export const selectItemProps: PropDeclarations<SelectItemProps> =
  listboxItemProps

export interface SelectItemEvents extends ListboxItemEvents {}

export const selectItemEvents: EventDeclarations<SelectItemEvents> =
  listboxItemEvents
