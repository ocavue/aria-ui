import type { ListboxItemProps } from "@aria-ui/listbox"

/**
 * @group SelectItem
 */
export interface SelectItemProps {
  /**
   * {@inheritDoc @aria-ui/listbox!ListboxItemProps.value}
   *
   * @default ""
   */
  value: ListboxItemProps["value"]
}

/**
 * @group SelectList
 *
 * @internal
 */
export const defaultSelectItemProps = Object.freeze({
  value: "",
}) satisfies SelectItemProps
