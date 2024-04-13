import {
  defaultPopoverTriggerProps,
  type PopoverTriggerProps,
} from "@aria-ui/popover"

/**
 * @internal
 */
export type MenuTriggerProps = PopoverTriggerProps

/**
 * @internal
 */
export const defaultMenuTriggerProps = Object.freeze({
  ...defaultPopoverTriggerProps,
}) satisfies MenuTriggerProps
