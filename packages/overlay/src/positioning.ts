import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
} from "@floating-ui/dom"
import type {
  FloatingElement,
  Middleware,
  ReferenceElement,
} from "@floating-ui/dom"
import type { DetectOverflowOptions } from "@floating-ui/dom"
import { getWindow } from "@zag-js/dom-query"

import type { OverlayPositionerProps } from "./overlay-positioner.props"

export function updatePlacement(
  floating: FloatingElement | null,
  reference: ReferenceElement | null,
  options: OverlayPositionerProps,
): VoidFunction | undefined {
  if (!floating || !reference) return

  /* -----------------------------------------------------------------------------
   * The middleware stack
   * -----------------------------------------------------------------------------*/

  const middleware: (Middleware | undefined)[] = [
    setupOffset(options),
    setupFlip(options),
    setupShift(options),
    setupSize(options),
    setupInline(options),
    setupHide(options),
  ]

  /* -----------------------------------------------------------------------------
   * The actual positioning function
   * -----------------------------------------------------------------------------*/

  const { placement, strategy } = options

  let canceled = false

  const update = async () => {
    if (!reference || !floating || canceled) {
      return
    }

    if (options.hoist && popoverAvailable) {
      // Override the `margin: auto` style, which breaks the positioning.
      floating.style.margin = "unset"
      floating.setAttribute("popover", "manual")
      floating.showPopover?.()
    }

    const pos = await computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
    })

    if (canceled) {
      return
    }

    if (options.hide) {
      const hidden =
        // Whether the floating element is fully clipped
        pos.middlewareData.hide?.escaped ||
        // Whether the reference element is fully clipped
        pos.middlewareData.hide?.referenceHidden

      floating.style.visibility = hidden ? "hidden" : "visible"
    }

    const win = getWindow(floating)
    const x = roundByDPR(win, pos.x)
    const y = roundByDPR(win, pos.y)

    floating.style.position = pos.strategy
    floating.style.left = "0"
    floating.style.top = "0"
    // translate3d() has better performance than translate() and top/left.
    floating.style.transform = `translate3d(${x}px,${y}px,0)`
  }

  const autoUpdateOptions =
    typeof options.autoUpdate === "boolean" ? undefined : options.autoUpdate

  const cancelAutoUpdate = options.autoUpdate
    ? autoUpdate(reference, floating, update, autoUpdateOptions)
    : undefined

  if (!options.autoUpdate) {
    void update()
  }

  return () => {
    canceled = true
    cancelAutoUpdate?.()
  }
}

function getOverflowOptions(
  props: OverlayPositionerProps,
): DetectOverflowOptions {
  return {
    boundary: props.boundary,
    rootBoundary: props.rootBoundary,
    elementContext: props.elementContext,
    altBoundary: props.altBoundary,
    padding: props.overflowPadding,
  }
}

function setupOffset(props: OverlayPositionerProps) {
  if (props.offset == null) return
  return offset(props.offset)
}

function setupFlip(props: OverlayPositionerProps) {
  if (!props.flip) return
  return flip({
    ...getOverflowOptions(props),

    fallbackPlacements: props.flip === true ? undefined : props.flip,

    // Disable the cross axis check so that `flip()` can work with `shift()`.
    // See also https://floating-ui.com/docs/flip#combining-with-shift
    crossAxis: false,
  })
}

function setupShift(props: OverlayPositionerProps) {
  if (!props.shift) return
  return shift({
    ...getOverflowOptions(props),

    mainAxis: props.shift,
    crossAxis: props.overlap,
  })
}

function setupSize(props: OverlayPositionerProps) {
  if (!props.fitViewport && !props.sameWidth && !props.sameHeight) return

  return size({
    ...getOverflowOptions(props),

    apply({ elements, rects, availableHeight, availableWidth }) {
      const floating = elements.floating

      if (props.sameWidth) {
        floating.style.width = `${Math.round(rects.reference.width)}px`
      }
      if (props.sameHeight) {
        floating.style.height = `${Math.round(rects.reference.height)}px`
      }
      if (props.fitViewport) {
        floating.style.maxWidth = `${Math.floor(availableWidth)}px`
        floating.style.maxHeight = `${Math.floor(availableHeight)}px`
      }
    },
  })
}

function setupInline(props: OverlayPositionerProps) {
  if (!props.inline) return
  return inline()
}

function setupHide(props: OverlayPositionerProps) {
  if (!props.hide) return
  return hide({
    padding: props.overflowPadding,
    elementContext: "reference",
  })
}

// https://floating-ui.com/docs/misc#subpixel-and-accelerated-positioning
function roundByDPR(win: Window, value: number) {
  const dpr = win.devicePixelRatio || 1
  return Math.round(value * dpr) / dpr
}

/**
 * Whether the browser supports the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 */
export const popoverAvailable: boolean =
  typeof HTMLElement !== "undefined" &&
  Object.hasOwn(HTMLElement.prototype, "popover")
