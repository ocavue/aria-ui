import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxEvents,
  type ListboxEvents,
  listboxProps,
  type ListboxProps,
} from "@aria-ui/listbox"
import omit from "just-omit"

/**
 * @group ComboboxList
 */
export interface ComboboxListProps extends Omit<ListboxProps, "eventTarget"> {}

/**
 * @group ComboboxList
 * @internal
 */
export const comboboxListProps: PropDeclarations<ComboboxListProps> = omit(
  listboxProps,
  "eventTarget",
)

/**
 * @group ComboboxList
 */
export interface ComboboxListEvents extends ListboxEvents {}

/**
 * @group ComboboxList
 * @internal
 */
export const comboboxListEvents: EventDeclarations<ComboboxListEvents> =
  listboxEvents
