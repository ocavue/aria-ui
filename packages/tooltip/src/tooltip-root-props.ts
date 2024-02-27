/**
 * @group TooltipRoot
 */
export interface TooltipRootProps {
  /**
   * TODO: not used yet
   * @hidden
   */
  delay: number
  /**
   * TODO: not used yet
   * @hidden
   */
  skipDelay: number
}

/**
 * @hidden
 */
export const defaultTooltipRootProps = Object.freeze({
  delay: 700,
  skipDelay: 300,
}) satisfies TooltipRootProps
