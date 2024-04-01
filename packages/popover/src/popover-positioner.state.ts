import {
  useAriaAttribute,
  useAttribute,
  type ConnectableElement,
  type SingalState,
  createSignal,
  useEffect,
} from "@aria-ui/core"
import { useOverlayPositioner } from "@aria-ui/overlay"
import { usePresence } from "@aria-ui/presence"
import {
  trackDismissableElement,
  type DismissableElementOptions,
} from "@zag-js/dismissable"

import {
  defaultPopoverPositionerProps,
  type PopoverPositionerProps,
} from "./popover-positioner.props"
import { openContext, triggerElementContext } from "./popover-root.context"

/**
 * Properties: {@link PopoverPositionerProps}
 *
 * Data attributes: {@link PopoverPositionerDataAttributes}
 *
 * @group PopoverPositioner
 */
export function usePopoverPositioner(
  element: ConnectableElement,
  props?: Partial<PopoverPositionerProps>,
): SingalState<PopoverPositionerProps> {
  const overlayPositionerState = useOverlayPositioner(element, {
    ...defaultPopoverPositionerProps,
    ...props,
  })

  const onEscapeKeyDown = createSignal(
    props?.onEscapeKeyDown ?? defaultPopoverPositionerProps.onEscapeKeyDown,
  )
  const onPointerDownOutside = createSignal(
    props?.onPointerDownOutside ??
      defaultPopoverPositionerProps.onPointerDownOutside,
  )
  const onFocusOutside = createSignal(
    props?.onFocusOutside ?? defaultPopoverPositionerProps.onFocusOutside,
  )
  const onInteractOutside = createSignal(
    props?.onInteractOutside ?? defaultPopoverPositionerProps.onInteractOutside,
  )

  const open = openContext.consume(element)
  const triggerElement = triggerElementContext.consume(element)

  useAriaAttribute(element, "aria-hidden", () => `${!open.value}`)
  usePresence(element, open)
  useAttribute(element, "data-state", () => (open.value ? "open" : "closed"))

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
