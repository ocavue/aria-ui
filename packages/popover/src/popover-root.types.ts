import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"

/**
 * @group PopoverRoot
 */
export interface PopoverRootProps {
  /**
   * Whether the popover is open by default.
   *
   * @default false
   */
  defaultOpen: boolean

  /**
   * Whether the popover is open.
   *
   * @default false
   */
  open: boolean
}

/**
 * @hidden
 */
export const popoverRootProps: PropDeclarations<PopoverRootProps> = {
  defaultOpen: { default: false },
  open: { default: false },
}

/**
 * @group PopoverRoot
 */
export interface PopoverRootEvents {
  "update:open": CustomEvent<boolean>
}

/**
 * @group PopoverContent
 */
export const popoverRootEvents: EventDeclarations<PopoverRootEvents> = {
  "update:open": {},
}
