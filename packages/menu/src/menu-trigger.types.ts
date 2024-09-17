import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import {
  popoverTriggerEvents,
  popoverTriggerProps,
  type PopoverTriggerEvents,
  type PopoverTriggerProps,
} from "@aria-ui/popover"

/**
 * @internal
 */
export type MenuTriggerProps = PopoverTriggerProps

/**
 * @internal
 */
export const menuTriggerProps: PropDeclarations<MenuTriggerProps> =
  popoverTriggerProps

/**
 * @internal
 */
export interface MenuTriggerEvents extends PopoverTriggerEvents {}

/**
 * @internal
 */
export const menuTriggerEvents: EventDeclarations<MenuTriggerEvents> =
  popoverTriggerEvents
