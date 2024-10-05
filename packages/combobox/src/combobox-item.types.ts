import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  listboxItemEvents,
  listboxItemProps,
  type ListboxItemEvents,
  type ListboxItemProps,
} from "@aria-ui/listbox/elements"

/**
 * @group ComboboxItem
 */
export interface ComboboxItemProps extends ListboxItemProps {}

/**
 * @group ComboboxItem
 * @internal
 */
export const comboboxItemProps: PropDeclarations<ComboboxItemProps> =
  listboxItemProps

/**
 * @group ComboboxItem
 * @internal
 */
export interface ComboboxItemEvents extends ListboxItemEvents {}

/**
 * @group ComboboxItem
 * @internal
 */
export const comboboxItemEvents: EventDeclarations<ComboboxItemEvents> =
  listboxItemEvents
