import {
  type ConnectableElement,
  type SingalState,
  createComputed,
  createSignal,
  assignProps,
  mapSignals,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay"
import { nanoid } from "nanoid"

import {
  focusedContext,
  hoveringContext,
  idContext,
  openContext,
} from "./tooltip-contexts"
import {
  type TooltipRootProps,
  defaultTooltipRootProps,
} from "./tooltip-root-props"

/**
 * @group TooltipRoot
 */
export function useTooltipRoot(
  element: ConnectableElement,
  props?: Partial<TooltipRootProps>,
): SingalState<TooltipRootProps> {
  const mergedProps = assignProps(defaultTooltipRootProps, props)
  const state = mapSignals(mergedProps)
  useOverlayRoot(element)

  const hovering = createSignal(false)
  const focused = createSignal(false)
  const open = createComputed(() => hovering.value || focused.value || false)

  hoveringContext.provide(element, hovering)
  focusedContext.provide(element, focused)
  openContext.provide(element, open)
  idContext.provide(element, createSignal(nanoid()))

  return state
}
