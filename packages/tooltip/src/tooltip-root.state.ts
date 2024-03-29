import {
  createComputed,
  createSignal,
  useEffect,
  type ConnectableElement,
  type Signal,
  type SingalState,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay"
import { nanoid } from "nanoid"

import { useTooltipRootProps } from "./tooltip-root.context.gen"
import type { TooltipRootProps } from "./tooltip-root.props"
import {
  focusedContext,
  hoveringContext,
  idContext,
  openContext,
} from "./tooltip.context"

let activatedAt = 0
let deactivatedAt = 0

// The currently opening tooltip's open signal and its id
let openingTooltip: Signal<boolean> | null = null
let openingId: string | null = null

/**
 * @group TooltipRoot
 */
export function useTooltipRoot(
  element: ConnectableElement,
  props?: Partial<TooltipRootProps>,
): SingalState<TooltipRootProps> {
  const state = useTooltipRootProps(element, props)
  useOverlayRoot(element)

  const hovering = createSignal(false)
  const focused = createSignal(false)
  const activated = createComputed(() => hovering.value || focused.value)
  const open = createSignal(false)
  const id = nanoid()

  const check = () => {
    const now = Date.now()
    if (activated.peek()) {
      if (
        now - activatedAt >= state.openDelay.peek() ||
        now - deactivatedAt <= state.closeDelay.peek()
      ) {
        open.value = true

        // Close the previous open tooltip
        if (openingTooltip && openingId !== id) {
          openingTooltip.value = false
        }

        openingTooltip = open
        openingId = id
      }
    } else {
      if (now - deactivatedAt >= state.closeDelay.peek()) {
        open.value = false

        if (openingId === id) {
          openingTooltip = null
          openingId = null
        }
      }
    }
  }

  useEffect(element, () => {
    if (activated.value) {
      activatedAt = Date.now()
    } else {
      deactivatedAt = Date.now()
    }

    for (const delay of new Set([
      0,
      state.openDelay.peek(),
      state.closeDelay.peek(),
    ])) {
      setTimeout(check, delay)
    }
  })

  hoveringContext.provide(element, hovering)
  focusedContext.provide(element, focused)
  openContext.provide(element, open)
  idContext.provide(element, createSignal(id))

  return state
}
