import type {
  EmptyObject,
  EventDeclarations,
  PropDeclarations,
} from "@aria-ui/core"

/**
 * @group SelectValue
 */
export interface SelectValueProps {
  /**
   * The value to show when no item is selected
   *
   * @default ""
   */
  placeholder: string
}

/**
 * @internal
 */
export const selectValueProps: PropDeclarations<SelectValueProps> = {
  placeholder: { default: "" },
}

/**
 * @internal
 */
export interface SelectValueEvents extends EmptyObject {}

/**
 * @internal
 */
export const selectValueEvents: EventDeclarations<SelectValueEvents> = {}