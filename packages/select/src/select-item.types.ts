import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxItemEvents,
  listboxItemProps,
  type ListboxItemEvents,
  type ListboxItemProps,
} from "@aria-ui/listbox"

/**
 * @group SelectItem
 */
export interface SelectItemProps extends ListboxItemProps {}

/**
 * @internal
 */
export const selectItemProps: PropDeclarations<SelectItemProps> =
  listboxItemProps

/**
 * @internal
 */
export interface SelectItemEvents extends ListboxItemEvents {}

/**
 * @internal
 */
export const selectItemEvents: EventDeclarations<SelectItemEvents> =
  listboxItemEvents
