import {
  defaultPopoverRootProps,
  type PopoverRootProps,
} from "@aria-ui/popover"

/**
 * @group SelectRoot
 * @internal
 */
export interface SelectRootProps extends PopoverRootProps {}

/**
 * @group SelectRoot
 * @internal
 */
export const defaultSelectRootProps = Object.freeze({
  ...defaultPopoverRootProps,
}) satisfies SelectRootProps
