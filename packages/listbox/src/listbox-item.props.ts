import { defineProps } from "@aria-ui/core"

/**
 * @group ListboxItem
 */
export interface ListboxItemProps {
  /**
   * The value of the item. Every item must have a unique value in the parent
   * list.
   *
   * @default ""
   */
  value: string

  /**
   * The function to call when the item is selected.
   *
   * @default null
   */
  onSelect: VoidFunction | null
}

/**
 * @hidden
 */
export const listboxItemProps = defineProps<ListboxItemProps>({
  value: { default: "" },
  onSelect: { default: null },
})
