import type {
  Alignment,
  DetectOverflowOptions,
  FloatingElement,
  Middleware,
  Placement,
  ReferenceElement,
  Side,
} from "@floating-ui/dom"
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
import { getWindow } from "@zag-js/dom-query"

import type {
  OverlayPositionerDataAttributes,
  OverlayPositionerProps,
} from "./overlay-positioner.props"

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

    const x = roundByDPR(floating, pos.x)
    const y = roundByDPR(floating, pos.y)

    floating.style.position = pos.strategy

    if (options.transform) {
      floating.style.left = "0"
      floating.style.top = "0"
      // translate3d() has better performance than translate() and top/left.
      floating.style.transform = `translate3d(${x}px,${y}px,0)`
      if (getDPR(floating) >= 1.5) {
        // Learned from https://github.com/floating-ui/floating-ui/blob/8f155121/packages/vue/src/useFloating.ts#L72
        floating.style.willChange = "transform"
      }
    } else {
      floating.style.left = `${x}px`
      floating.style.top = `${y}px`
      floating.style.removeProperty("transform")
    }

    const [side, align] = getSideAndAlignFromPlacement(pos.placement)
    const attributes = {
      "data-side": side,
      "data-align": align,
    } satisfies OverlayPositionerDataAttributes
    for (const [key, value] of Object.entries(attributes)) {
      floating.setAttribute(key, value)
    }
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
function roundByDPR(element: Element, value: number): number {
  const dpr = getDPR(element)
  return Math.round(value * dpr) / dpr
}

function getDPR(element: Element): number {
  const win = getWindow(element)
  return win.devicePixelRatio || 1
}

function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = "center"] = placement.split("-")
  return [side as Side, align as Alignment | "center"] as const
}

/**
 * Whether the browser supports the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 */
export const popoverAvailable: boolean =
  typeof HTMLElement !== "undefined" &&
  Object.hasOwn(HTMLElement.prototype, "popover")
