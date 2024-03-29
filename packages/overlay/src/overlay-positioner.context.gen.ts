import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultOverlayPositionerProps, type OverlayPositionerProps } from "./overlay-positioner.props"

const context = createContext<Partial<OverlayPositionerProps>>("OverlayPositioner", {})

/**
 * @internal
 */
export function useOverlayPositionerProps(
  element: ConnectableElement,
  props?: Partial<OverlayPositionerProps>,
): SingalState<OverlayPositionerProps> {
  return useProps(element, context, defaultOverlayPositionerProps, props)
}

/**
 * Set the props for the child OverlayPositioner elements.
 * 
 * @internal
 *
 * @group OverlayPositioner
 */
export function useOverlayPositionerPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<OverlayPositionerProps>>,
): void {
  usePropsProvider<OverlayPositionerProps>(element, context, state)
}
