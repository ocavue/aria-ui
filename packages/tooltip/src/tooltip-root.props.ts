import { defineProps } from "@aria-ui/core"

/**
 * @group TooltipRoot
 * @hidden
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
export const tooltipRootProps = defineProps<TooltipRootProps>({
  openDelay: { default: 700 },
  closeDelay: { default: 300 },
  open: { default: false },
  onOpenChange: { default: null },
})
