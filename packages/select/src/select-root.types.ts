import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  popoverRootEvents,
  popoverRootProps,
  type PopoverRootEvents,
  type PopoverRootProps,
} from "@aria-ui/popover"

/**
 * @group SelectRoot
 */
export interface SelectRootProps extends PopoverRootProps {}

/**
 * @internal
 */
export const selectRootProps: PropDeclarations<SelectRootProps> = {
  ...popoverRootProps,
}

/**
 * @group SelectRoot
 */
export interface SelectRootEvents extends PopoverRootEvents {}

/**
 * @internal
 */
export const selectRootEvents: EventDeclarations<SelectRootEvents> =
  popoverRootEvents
