import { defineProps } from "@aria-ui/core"
import type { ListboxEmptyProps } from "@aria-ui/listbox"

/**
 * @group ComboboxEmpty
 * @internal
 */
export interface ComboboxEmptyProps extends ListboxEmptyProps {}

/**
 * @group ComboboxEmpty
 * @internal
 */
export const comboboxEmptyProps = defineProps<ComboboxEmptyProps>({})
