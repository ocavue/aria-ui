import { defineProps, type EmptyObject } from "@aria-ui/core"

/**
 * @group ListboxItem
 * @internal
 */
export interface ListboxEmptyProps extends EmptyObject {}

/**
 * @hidden
 * @internal
 */
export const listboxEmptyProps = defineProps<ListboxEmptyProps>({})
