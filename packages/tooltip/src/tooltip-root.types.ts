import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"

/**
 * @group TooltipRoot
 */
export interface TooltipRootProps {
  /**
   * The delay in milliseconds before the tooltip opens.
   *
   * @default 700
   */
  openDelay: number

  /**
   * The delay in milliseconds before the tooltip closes.
   *
   * @default 300
   */
  closeDelay: number

  /**
   * Whether the popover is open.
   *
   * @default false
   */
  open: boolean
}

/**
 * @hidden
 */
export const tooltipRootProps: PropDeclarations<TooltipRootProps> = {
  openDelay: { default: 700 },
  closeDelay: { default: 300 },
  open: { default: false },
}

/**
 * @group TooltipRoot
 */
export interface TooltipRootEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: CustomEvent<boolean>
}

/**
 * @hidden
 */
export const tooltipRootEvents: EventDeclarations<TooltipRootEvents> = {
  openChange: {},
}
