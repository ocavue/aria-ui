/**
 * @group ListboxItem
 */
export interface ListboxItemProps {
  value: string | null
}

/**
 * @hidden
 */
export const defaultListboxItemProps = Object.freeze({
  value: null,
}) satisfies ListboxItemProps
