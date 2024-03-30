import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultPopoverPositionerProps, type PopoverPositionerProps } from "./popover-positioner.props"

const context = createContext<Partial<PopoverPositionerProps>>("PopoverPositioner", {})

/**
 * @internal
 */
export function usePopoverPositionerProps(
  element: ConnectableElement,
  props?: Partial<PopoverPositionerProps>,
): SingalState<PopoverPositionerProps> {
  return useProps(element, context, defaultPopoverPositionerProps, props)
}

/**
 * Set the props for the child PopoverPositioner elements.
 * 
 * @internal
 *
 * @group PopoverPositioner
 */
export function usePopoverPositionerPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<PopoverPositionerProps>>,
): void {
  usePropsProvider<PopoverPositionerProps>(element, context, state)
}
