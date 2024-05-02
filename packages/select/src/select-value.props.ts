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
export const defaultSelectValueProps = Object.freeze({
  placeholder: "" as string,
}) satisfies SelectValueProps
