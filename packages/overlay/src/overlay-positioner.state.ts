import {
  assignProps,
  mapSignals,
  mapValues,
  useAnimationFrame,
  type ConnectableElement,
  type SingalState,
} from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"

import { referenceContext } from "./contexts"
import {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from "./overlay-positioner.props"
import { updatePlacement } from "./positioning"

/**
 * @group OverlayPositioner
 */
export function useOverlayPositioner(
  element: ConnectableElement,
  props?: Partial<OverlayPositionerProps>,
): SingalState<OverlayPositionerProps> {
  const state = mapSignals(assignProps(defaultOverlayPositionerProps, props))
  const reference = referenceContext.consume(element)
  useOverlayPositionerState(element, state, { reference })
  return state
}

/**
 * @group OverlayPositioner
 *
 * @internal
 */
export function useOverlayPositionerState(
  element: ConnectableElement,
  state: SingalState<OverlayPositionerProps>,
  context: SingalState<{ reference: ReferenceElement | null }>,
): void {
  // Use animation frame because we only want to calculate the position at
  // most once per frame.
  useAnimationFrame(element, () => {
    const stateValues = mapValues(state)
    const referenceValue = context.reference.value

    return () => updatePlacement(element, referenceValue, stateValues)
  })
}
