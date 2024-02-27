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
}

/**
 * @hidden
 */
export const defaultTooltipRootProps = Object.freeze({
  openDelay: 700,
  closeDelay: 200,
}) satisfies TooltipRootProps
