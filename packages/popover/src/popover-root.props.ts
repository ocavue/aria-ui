/**
 * @group PopoverRoot
 */
export interface PopoverRootProps {
  /**
   * Whether the popover is open by default.
   *
   * @default false
   */
  defaultOpen: boolean
}

/**
 * @hidden
 */
export const defaultPopoverRootProps = Object.freeze({
  defaultOpen: false,
}) satisfies PopoverRootProps
