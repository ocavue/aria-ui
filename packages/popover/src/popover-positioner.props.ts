import type { OverlayPositionerProps } from "@aria-ui/overlay"
import { defaultOverlayPositionerProps } from "@aria-ui/overlay"

/**
 * @group PopoverPositioner
 */
export interface PopoverPositionerProps extends OverlayPositionerProps {
  /**
   * Whether the popover is open.
   *
   * @default "false"
   */
  open: boolean

  /**
   * The id of the popover.
   *
   * @default ""
   *
   * @internal
   */
  identifier: string
}

/**
 * @hidden
 */
export const defaultPopoverPositionerProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  open: false,
  identifier: "",
}) satisfies PopoverPositionerProps
