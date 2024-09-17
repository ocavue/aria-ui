import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  popoverRootEvents,
  popoverRootProps,
  type PopoverRootEvents,
  type PopoverRootProps,
} from "@aria-ui/popover"

/**
 * @group MenuRoot
 */
export type MenuRootProps = PopoverRootProps

/**
 * @hidden
 */
export const menuRootProps: PropDeclarations<MenuRootProps> = popoverRootProps

export type MenuRootEvents = PopoverRootEvents

export const menuRootEvents: EventDeclarations<MenuRootEvents> =
  popoverRootEvents
