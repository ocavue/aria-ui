import { defineProps } from "@aria-ui/core"
import { popoverContentProps, type PopoverContentProps } from "@aria-ui/popover"

/**
 * @group MenuContent
 * @hidden
 */
export interface MenuContentProps extends PopoverContentProps {
  /**
   * By default, the menu element will listen for keydown events. However,
   * you can pass `onKeydownHandlerAdd` to override the default behavior.
   * `onKeydownHandlerAdd` receives a keydown handler when the Menu element
   * is mounted, and returns a function that will be called when the Menu
   * element is unmounted.
   *
   * @default null
   */
  onKeydownHandlerAdd:
    | ((handler: (event: KeyboardEvent) => void) => VoidFunction)
    | null
}

/**
 * @hidden
 */
export const menuContentProps = defineProps<MenuContentProps>({
  ...popoverContentProps,
  onKeydownHandlerAdd: { default: null },
})
