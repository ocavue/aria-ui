import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"

/**
 * @group PopoverRoot
 * @hidden
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

export interface PopoverRootEvents {
  "update:open": CustomEvent<boolean>
}

export const popoverRootEvents: EventDeclarations<PopoverRootEvents> = {
  "update:open": {},
}
