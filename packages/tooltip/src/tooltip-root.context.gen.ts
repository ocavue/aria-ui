import {
  createContext,
  useProps,
  usePropsProvider,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"

import { defaultTooltipRootProps, type TooltipRootProps } from "./tooltip-root.props"

const context = createContext<Partial<TooltipRootProps>>("TooltipRoot", {})

/**
 * @internal
 */
export function useTooltipRootProps(
  element: ConnectableElement,
  props?: Partial<TooltipRootProps>,
): SingalState<TooltipRootProps> {
  return useProps(element, context, defaultTooltipRootProps, props)
}

/**
 * Set the props for the child TooltipRoot elements.
 * 
 * @internal
 *
 * @group TooltipRoot
 */
export function useTooltipRootPropsProvider(
  element: ConnectableElement,
  state: SingalState<Partial<TooltipRootProps>>,
): void {
  usePropsProvider<TooltipRootProps>(element, context, state)
}
