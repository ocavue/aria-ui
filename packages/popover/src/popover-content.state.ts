import {
  createSignal,
  useAriaAttribute,
  useAttribute,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
  useAnimationFrame,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"
import {
  trackDismissableElement,
  type DismissableElementOptions,
} from "@zag-js/dismissable"
import { getFirstTabbable } from "@zag-js/tabbable"

import {
  defaultPopoverContentProps,
  type PopoverContentDataAttributes,
  type PopoverContentProps,
} from "./popover-content.props"
import { openContext, triggerElementContext } from "./popover-root.context"

/**
 * Properties: {@link PopoverContentProps}
 *
 * Data attributes: {@link PopoverContentDataAttributes}
 *
 * @group PopoverContent
 */
export function usePopoverContent(
  element: ConnectableElement,
  props?: Partial<PopoverContentProps>,
): SignalState<PopoverContentProps> {
  const overlayPositionerState = useOverlayPositioner(element, {
    ...defaultPopoverContentProps,
    ...props,
  })

  const onEscapeKeyDown = createSignal(
    props?.onEscapeKeyDown ?? defaultPopoverContentProps.onEscapeKeyDown,
  )
  const onPointerDownOutside = createSignal(
    props?.onPointerDownOutside ??
      defaultPopoverContentProps.onPointerDownOutside,
  )
  const onFocusOutside = createSignal(
    props?.onFocusOutside ?? defaultPopoverContentProps.onFocusOutside,
  )
  const onInteractOutside = createSignal(
    props?.onInteractOutside ?? defaultPopoverContentProps.onInteractOutside,
  )

  const open = openContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.value}`)
  usePresence(element, open)
  useAttribute(
    element,
    "data-state",
    (): PopoverContentDataAttributes["data-state"] => {
      return open.value ? "open" : "closed"
    },
  )

  useAutoFocus(element, open)

  const options: DismissableElementOptions = {
    onDismiss: () => {
      open.value = false
    },
    onEscapeKeyDown: (event) => {
      onEscapeKeyDown.value?.(event)
    },
    onPointerDownOutside: (event) => {
      onPointerDownOutside.value?.(event)
    },
    onFocusOutside: (event) => {
      onFocusOutside.value?.(event)
    },
    onInteractOutside: (event) => {
      onInteractOutside.value?.(event)
    },
    exclude: () => {
      return triggerElement.value
    },
  }

  useEffect(element, () => {
    trackDismissableElement(element, options)
  })

  return {
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    ...overlayPositionerState,
  }
}

function useAutoFocus(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
) {
  let previousOpenValue = open.peek()

  // Use animation frame because focus is not applied immediately
  useAnimationFrame(element, () => {
    const openValue = open.value
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
