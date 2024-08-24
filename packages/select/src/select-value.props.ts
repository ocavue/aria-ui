import { defineProps } from "@aria-ui/core"

/**
 * @group SelectValue
 * @hidden
 */
export interface SelectValueProps {
  /**
   * The value to show when no item is selected
   *
   * @default ""
   */
  placeholder: string
}

/**
 * @group SelectList
 *
 * @internal
 */
export const selectValueProps = defineProps<SelectValueProps>({
  placeholder: { default: "" },
})
