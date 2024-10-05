import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import type { ListboxEmptyEvents, ListboxEmptyProps } from "@aria-ui/listbox"

/**
 * @group ComboboxEmpty
 * @internal
 */
export interface ComboboxEmptyProps extends ListboxEmptyProps {}

/**
 * @group ComboboxEmpty
 * @internal
 */
export const comboboxEmptyProps: PropDeclarations<ComboboxEmptyProps> = {}

/**
 * @group ComboboxEmpty
 * @internal
 */
export interface ComboboxEmptyEvents extends ListboxEmptyEvents {}

/**
 * @group ComboboxEmpty
 * @internal
 */
export const comboboxEmptyEvents: EventDeclarations<ComboboxEmptyEvents> = {}
