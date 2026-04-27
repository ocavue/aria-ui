import { FeatureDetection } from '@aria-ui/utils'
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
  type Alignment,
  type DetectOverflowOptions,
  type FloatingElement,
  type Middleware,
  type Placement,
  type ReferenceElement,
  type Side,
  type VirtualElement,
} from '@floating-ui/dom'
import type {
  AutoUpdateOptions,
  Boundary,
  ElementContext,
  OffsetOptions,
  RootBoundary,
} from '@floating-ui/dom'
import { getWindow, isElementLike } from '@ocavue/utils'

/**
 * @internal
 */
interface UpdatePlacementOpinions {
  strategy: 'absolute' | 'fixed'
  placement: Placement
  autoUpdate: boolean | AutoUpdateOptions
  hoist: boolean
  offset: OffsetOptions
  flip: boolean | Placement[]
  shift: boolean
  overlap: boolean
  fitViewport: boolean
  sameWidth: boolean
  sameHeight: boolean
  inline: boolean
  hide: boolean
  boundary: Boundary
  rootBoundary: RootBoundary
  overflowPadding: number
  elementContext: ElementContext
  altBoundary: boolean

  setIsHidden: (hidden: boolean) => void
}

/**
 * @internal
 */
export function updatePlacement(
  floating: FloatingElement,
  reference: ReferenceElement,
  options: UpdatePlacementOpinions,
): VoidFunction | undefined {
  /* -----------------------------------------------------------------------------
   * The middleware stack
   * -----------------------------------------------------------------------------*/

  const middleware: (Middleware | undefined)[] = [
    setupOffset(options),
    setupFlip(options),
    setupShift(options),
    setupSize(options),
    setupInline(options),
    setupTransformOrigin(options),
    setupHide(options),
  ]

  /* -----------------------------------------------------------------------------
   * The actual positioning function
   * -----------------------------------------------------------------------------*/

  const { placement, strategy } = options

  let canceled = false

  // Skip redundant writes between autoUpdate ticks.
  let hoistApplied = false
  let lastPosition: string | undefined
  let topLeftSet = false
  let lastTransform: string | undefined
  let willChangeSet = false
  let lastSide: string | undefined
  let lastAlign: string | undefined

  const update = async () => {
    if (canceled) {
      return
    }

    const referenceElement = unwrapElement(reference)
    if (referenceElement && !referenceElement.isConnected) {
      return
    }

    if (options.hoist && FeatureDetection.supportsPopover() && !hoistApplied) {
      // Override the `margin: auto` style, which breaks the positioning.
      floating.style.margin = 'unset'
      floating.setAttribute('popover', 'manual')
      hoistApplied = true
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

    let isTempHidden = false
    if (options.hide) {
      const hideData = pos.middlewareData.hide
      isTempHidden =
        // Whether the floating element is fully clipped
        hideData?.escaped ||
        // Whether the reference element is fully clipped
        hideData?.referenceHidden ||
        false
      options.setIsHidden(isTempHidden)
    }

    const dpr = getDPR(floating)

    // https://floating-ui.com/docs/misc#subpixel-and-accelerated-positioning
    const x = Math.round(pos.x * dpr) / dpr
    const y = Math.round(pos.y * dpr) / dpr

    if (!isTempHidden) {
      if (lastPosition !== pos.strategy) {
        floating.style.position = pos.strategy
        lastPosition = pos.strategy
      }

      if (!topLeftSet) {
        floating.style.top = '0px'
        floating.style.left = '0px'
        topLeftSet = true
      }

      const transform = `translate(${x}px,${y}px)`
      if (lastTransform !== transform) {
        floating.style.transform = transform
        lastTransform = transform
      }

      // Learned from https://github.com/floating-ui/floating-ui/blob/8f155121/packages/vue/src/useFloating.ts#L72
      if (dpr >= 1.5 && !willChangeSet) {
        floating.style.willChange = 'transform'
        willChangeSet = true
      }

      const [side, align] = getSideAndAlignFromPlacement(pos.placement)

      if (lastSide !== side) {
        floating.setAttribute('data-side', side)
        lastSide = side
      }
      if (lastAlign !== align) {
        floating.setAttribute('data-align', align)
        lastAlign = align
      }
    }
  }

  /* -----------------------------------------------------------------------------
   * Auto update
   * -----------------------------------------------------------------------------*/

  const autoUpdateOptions = typeof options.autoUpdate === 'boolean' ? undefined : options.autoUpdate

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

function getOverflowOptions(props: UpdatePlacementOpinions): DetectOverflowOptions {
  return {
    boundary: props.boundary,
    rootBoundary: props.rootBoundary,
    elementContext: props.elementContext,
    altBoundary: props.altBoundary,
    padding: props.overflowPadding,
  }
}

function setupOffset(props: UpdatePlacementOpinions) {
  if (props.offset == null) return
  return offset(props.offset)
}

function setupFlip(props: UpdatePlacementOpinions) {
  if (!props.flip) return
  return flip({
    ...getOverflowOptions(props),

    fallbackPlacements: props.flip === true ? undefined : props.flip,

    // Disable the cross axis check so that `flip()` can work with `shift()`.
    // See also https://floating-ui.com/docs/flip#combining-with-shift
    crossAxis: false,
  })
}

function setupShift(props: UpdatePlacementOpinions) {
  if (!props.shift) return
  return shift({
    ...getOverflowOptions(props),

    mainAxis: props.shift,
    crossAxis: props.overlap,
  })
}

function setupSize(props: UpdatePlacementOpinions) {
  if (!props.fitViewport && !props.sameWidth && !props.sameHeight) return

  let lastWidth: string | undefined
  let lastHeight: string | undefined
  let lastMaxWidth: string | undefined
  let lastMaxHeight: string | undefined

  return size({
    ...getOverflowOptions(props),

    apply({ elements, rects, availableHeight, availableWidth }) {
      const floating = elements.floating

      if (props.sameWidth) {
        const width = `${Math.round(rects.reference.width)}px`
        if (lastWidth !== width) {
          floating.style.width = width
          lastWidth = width
        }
      }
      if (props.sameHeight) {
        const height = `${Math.round(rects.reference.height)}px`
        if (lastHeight !== height) {
          floating.style.height = height
          lastHeight = height
        }
      }
      if (props.fitViewport) {
        const maxWidth = `${Math.floor(availableWidth)}px`
        if (lastMaxWidth !== maxWidth) {
          floating.style.maxWidth = maxWidth
          lastMaxWidth = maxWidth
        }
        const maxHeight = `${Math.floor(availableHeight)}px`
        if (lastMaxHeight !== maxHeight) {
          floating.style.maxHeight = maxHeight
          lastMaxHeight = maxHeight
        }
      }
    },
  })
}

function setupInline(props: UpdatePlacementOpinions) {
  if (!props.inline) return
  return inline()
}

// Based on https://github.com/mui/base-ui/blob/d808eb5fc075eb955d50753bfc2dd007bcb4d9e5/packages/react/src/utils/useAnchorPositioning.ts#L356
function setupTransformOrigin(props: UpdatePlacementOpinions): Middleware {
  let lastTransformOrigin: string | undefined

  return {
    name: 'transformOrigin',
    fn(state) {
      const { elements, middlewareData, placement: renderedPlacement, rects, x, y } = state

      const [side] = getSideAndAlignFromPlacement(renderedPlacement)

      const refCenterX = rects.reference.x + rects.reference.width / 2 - x
      const refCenterY = rects.reference.y + rects.reference.height / 2 - y

      const transformX = Math.max(0, Math.min(refCenterX, rects.floating.width))
      const transformY = Math.max(0, Math.min(refCenterY, rects.floating.height))

      const offsetValue = getMainAxisOffset(props.offset)

      const shiftY = Math.abs(middlewareData.shift?.y || 0)
      const isOverlapping = shiftY > offsetValue
      const sideAxis = side === 'top' || side === 'bottom' ? 'y' : 'x'

      let transformOrigin: string

      if (props.overlap && sideAxis === 'y' && isOverlapping) {
        const halfAnchorHeight = rects.reference.height / 2
        transformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`
      } else {
        transformOrigin = {
          top: `${transformX}px calc(100% + ${offsetValue}px)`,
          bottom: `${transformX}px ${-offsetValue}px`,
          left: `calc(100% + ${offsetValue}px) ${transformY}px`,
          right: `${-offsetValue}px ${transformY}px`,
        }[side]!
      }

      if (lastTransformOrigin !== transformOrigin) {
        elements.floating.style.setProperty('--transform-origin', transformOrigin)
        lastTransformOrigin = transformOrigin
      }

      return {}
    },
  }
}

function getMainAxisOffset(offset: OffsetOptions): number {
  if (typeof offset === 'number') return offset
  if (typeof offset === 'object' && offset !== null) return offset.mainAxis ?? 0
  return 0
}

function setupHide(props: UpdatePlacementOpinions) {
  if (!props.hide) return
  return hide({
    padding: props.overflowPadding,
    elementContext: 'reference',
  })
}

function getDPR(element: Element): number {
  const win = getWindow(element)
  return win.devicePixelRatio || 1
}

function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side as Side, align as Alignment | 'center'] as const
}

/**
 * Unwraps a virtual element to its underlying DOM element.
 *
 * Copied from https://github.com/floating-ui/floating-ui/blob/b80ccaf9cfd7f80f28546906c60284c8385940f0/packages/dom/src/utils/unwrapElement.ts
 *
 * @internal
 */
function unwrapElement(element: Element | VirtualElement): Element | undefined {
  return !isElementLike(element) ? element.contextElement : element
}
