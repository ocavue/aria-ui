import {
  mapValues,
  useAnimationFrame,
  type ConnectableElement,
  type ReadonlySignal,
  type SetupOptions,
  type SignalState,
} from "@aria-ui/core"
import type { ReferenceElement } from "@floating-ui/dom"

import { referenceContext } from "./contexts"
import type {
  OverlayPositionerEvents,
  OverlayPositionerProps,
} from "./overlay-positioner.types"
import { updatePlacement } from "./positioning"

/**
 * @group OverlayPositioner
 * @hidden
 */
export function useOverlayPositioner(
  element: ConnectableElement,
  { state }: SetupOptions<OverlayPositionerProps, OverlayPositionerEvents>,
): void {
  const reference = referenceContext.consume(element)
  useOverlayPositionerState(element, state, { reference })
}

/**
 * @group OverlayPositioner
 *
 * @internal
 */
export function useOverlayPositionerState(
  element: ConnectableElement,
  state: SignalState<OverlayPositionerProps>,
  context: { reference: ReadonlySignal<ReferenceElement | null> },
): void {
  // Use animation frame because we only want to calculate the position at
  // most once per frame.
  useAnimationFrame(element, () => {
    const stateValues = mapValues(state)
    const referenceValue = context.reference.get()

    return () => updatePlacement(element, referenceValue, stateValues)
  })
}
