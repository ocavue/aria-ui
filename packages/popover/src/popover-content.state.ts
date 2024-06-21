import {
  useAnimationFrame,
  useAriaAttribute,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"
import {
  trackDismissableElement,
  type DismissableElementOptions,
} from "@zag-js/dismissable"
import { getFirstTabbable } from "@zag-js/tabbable"

import type {
  PopoverContentDataAttributes,
  PopoverContentProps,
} from "./popover-content.props"
import {
  onOpenChangeContext,
  openContext,
  triggerElementContext,
} from "./popover-root.context"

/**
 * Properties: {@link PopoverContentProps}
 *
 * Data attributes: {@link PopoverContentDataAttributes}
 *
 * @group PopoverContent
 * @hidden
 */
export function usePopoverContent(
  element: ConnectableElement,
  state: SignalState<PopoverContentProps>,
): void {
  useOverlayPositioner(element, state)

  const open = openContext.consume(element)
  const onOpenChange = onOpenChangeContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.get()}`)
  usePresence(element, open)
  useAttribute(
    element,
    "data-state",
    (): PopoverContentDataAttributes["data-state"] => {
      return open.get() ? "open" : "closed"
    },
  )

  useAutoFocus(element, open)

  const options: DismissableElementOptions = {
    onDismiss: () => {
      onOpenChange.get()?.(false)
    },
    onEscapeKeyDown: (event) => {
      state.onEscapeKeyDown.get()?.(event)
    },
    onPointerDownOutside: (event) => {
      state.onPointerDownOutside.get()?.(event)
    },
    onFocusOutside: (event) => {
      state.onFocusOutside.get()?.(event)
    },
    onInteractOutside: (event) => {
      state.onInteractOutside.get()?.(event)
    },
    exclude: () => {
      return triggerElement.get()
    },
  }

  useEffect(element, () => {
    // Only call `trackDismissableElement` when the menu is opened, so that the
    // Escape keydown event won't be captured when the menu is closed.
    if (!open.get()) {
      return
    }

    return trackDismissableElement(element, options)
  })
}

function useAutoFocus(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
) {
  let previousOpenValue = open.peek()

  // Use animation frame because focus is not applied immediately
  useAnimationFrame(element, () => {
    const openValue = open.get()
    const shouldFocus = openValue && !previousOpenValue
    previousOpenValue = openValue

    if (!shouldFocus) return

    return () => {
      if (open.peek()) {
        getFirstTabbable(element)?.focus({ preventScroll: true })
      }
    }
  })
}
