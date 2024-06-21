/**
 * @group PopoverRoot
 * @hidden
 */
export interface PopoverRootProps {
  /**
   * Whether the popover is open by default.
   *
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the popover is open.
   *
   * @default false
   */
  open: boolean

  /**
   * Event handler called then the open state changes because of a user interaction.
   *
   * @default null
   */
  onOpenChange: ((open: boolean) => void) | null
}

/**
 * @hidden
 */
export const defaultPopoverRootProps = Object.freeze({
  defaultOpen: false,
  open: false,
  onOpenChange: null,
}) satisfies PopoverRootProps
