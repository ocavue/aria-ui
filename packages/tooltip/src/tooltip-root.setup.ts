import {
  createComputed,
  createSignal,
  useEffect,
  type ConnectableElement,
  type SetupOptions,
  type Signal,
} from "@aria-ui/core"
import { useOverlayRoot } from "@aria-ui/overlay/elements"
import { nanoid } from "nanoid"

import type { TooltipRootEvents, TooltipRootProps } from "./tooltip-root.types"
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
 * @hidden
 */
export function useTooltipRoot(
  element: ConnectableElement,
  { state, emit }: SetupOptions<TooltipRootProps, TooltipRootEvents>,
): void {
  useOverlayRoot(element)

  const hovering = createSignal(false)
  const focused = createSignal(false)
  const activated = createComputed(() => hovering.get() || focused.get())
  const open = createSignal(false)
  const id = nanoid()

  const updateOpen = (value: boolean) => {
    if (open.peek() === value) return
    open.set(value)
    emit("openChange", value)
  }

  const check = () => {
    const now = Date.now()
    if (activated.peek()) {
      if (
        // The trigger has been activated for a while
        now - activatedAt >= state.openDelay.peek() ||
        // The previous opened tooltip has just been closed
        (openingId && now - deactivatedAt <= state.closeDelay.peek())
      ) {
        updateOpen(true)

        // Close the previous open tooltip
        if (openingTooltip && openingId !== id) {
          openingTooltip.set(false)
        }

        openingTooltip = open
        openingId = id
      }
    } else {
      if (now - deactivatedAt >= state.closeDelay.peek()) {
        updateOpen(false)

        if (openingId === id) {
          openingTooltip = null
          openingId = null
        }
      }
    }
  }

  useEffect(element, () => {
    if (activated.get()) {
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
  openContext.provide(
    element,
    createComputed(() => open.get()),
  )
  idContext.provide(element, createSignal(id))
}
