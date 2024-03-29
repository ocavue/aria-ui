import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultTooltipPositionerProps, type TooltipPositionerProps } from "./tooltip-positioner.props"

const context = createContext<Partial<TooltipPositionerProps>>("TooltipPositioner", {})

/**
 * @internal
 */
export function useTooltipPositionerProps(
  element: ConnectableElement,
  props?: Partial<TooltipPositionerProps>,
): SingalState<TooltipPositionerProps> {
  return useProps(element, context, defaultTooltipPositionerProps, props)
}

/**
 * Set the props for the child TooltipPositioner elements.
 * 
 * @internal
 *
 * @group TooltipPositioner
 */
export function useTooltipPositionerPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<TooltipPositionerProps>>,
): void {
  usePropsProvider<TooltipPositionerProps>(element, context, state)
}
