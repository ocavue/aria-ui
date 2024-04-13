import {
  defaultPopoverRootProps,
  type PopoverRootProps,
} from "@aria-ui/popover"

/**
 * @group MenuRoot
 */
export type MenuRootProps = PopoverRootProps

/**
 * @hidden
 */
export const defaultMenuRootProps = Object.freeze({
  ...defaultPopoverRootProps,
}) satisfies MenuRootProps
