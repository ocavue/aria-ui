import {
  assignProps,
  mapSignals,
  mapValues,
  useEffect,
  type ConnectableElement,
} from "@aria-ui/core"

import { referenceContext } from "./contexts"
import {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from "./overlay-positioner-props"
import { updatePlacement } from "./positioning"

/**
 * @group OverlayPositioner
 */
export function useOverlayPositioner(
  element: ConnectableElement,
  props?: Partial<OverlayPositionerProps>,
) {
  const mergedProps = assignProps(defaultOverlayPositionerProps, props)
  const state = mapSignals(mergedProps)
  const reference = referenceContext.consume(element, null)

  useEffect(element, () => {
    const stateValues = mapValues(state)
    const referenceValue = reference.value
    let dispose: VoidFunction | undefined = undefined

    // Use animation frame because we only want to calculate the position at
    // most once per frame.
    const id = requestAnimationFrame(() => {
      dispose?.()
      dispose = updatePlacement(element, referenceValue, stateValues)
    })
    return () => {
      cancelAnimationFrame(id)
      dispose?.()
      dispose = undefined
    }
  })

  return state
}
