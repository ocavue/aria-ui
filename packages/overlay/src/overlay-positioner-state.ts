import {
  type ConnectableElement,
  assignProps,
  mapSignals,
  mapValues,
  useEffect,
} from "@aria-ui/core"
import { referenceContext } from "./contexts"
import {
  type OverlayPositionerProps,
  defaultOverlayPositionerProps,
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
  const reference = referenceContext.consume(element)

  useEffect(element, () => {
    const stateValues = mapValues(state)
    const referenceValue = reference?.value ?? null
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
