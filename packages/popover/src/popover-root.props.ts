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
   * Event handler called when the user opens or closes the popover.
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
