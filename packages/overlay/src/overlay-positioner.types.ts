import type { EventDeclarations, PropDeclarations } from "@aria-ui/core"
import type {
  AutoUpdateOptions,
  Boundary,
  ElementContext,
  OffsetOptions,
  Placement,
  RootBoundary,
} from "@floating-ui/dom"

/**
 * @group OverlayPositioner
 */
export interface OverlayPositionerProps {
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy: "absolute" | "fixed"

  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: Placement

  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate: boolean | AutoUpdateOptions

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content. When enabled,
   * the floating element won't be clipped by an ancestor. This provides a
   * similar result to React's `<Portals>` or Vue's `<Teleport>`.
   *
   * @default true
   */
  hoist: boolean

  /**
   * Whether to use CSS transforms (`transform: translate3d()`) to position the
   * floating element instead of layout (`top` and `left` CSS properties). CSS
   * transforms are more performant, but can cause conflicts with transform
   * animations.
   *
   * @default false
   */
  transform: boolean

  // ------------------------------------------------------------------
  // Middlewares
  // ------------------------------------------------------------------

  /**
   * The distance between the reference and floating element.
   *
   * @default 6
   */
  offset?: OffsetOptions

  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip: boolean | Placement[]

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift: boolean

  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap: boolean

  /**
   * Whether to constrain the floating element's width and height to not exceed
   * the viewport.
   *
   * @default false
   */
  fitViewport: boolean

  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth: boolean

  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight: boolean

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline: boolean

  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default false
   */
  hide: boolean

  // ------------------------------------------------------------------
  // Detect overflow
  // ------------------------------------------------------------------

  /**
   * Describes the clipping element(s) or area that overflow will be checked relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.
   *
   * @default 'clippingAncestors'
   */
  boundary: Boundary

  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary: RootBoundary

  /**
   * Describes the virtual padding around the boundary to check for overflow.
   * Please see https://floating-ui.com/docs/detectoverflow#padding for more information.
   *
   * @default 4
   */
  overflowPadding: number

  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext: ElementContext

  /**
   * Whether to check the alternate elementContext’s boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default true
   */
  altBoundary: boolean
}

/**
 * @hidden
 */
export const overlayPositionerProps: PropDeclarations<OverlayPositionerProps> =
  {
    strategy: { default: "absolute" },
    placement: { default: "top" },
    autoUpdate: { default: true },
    hoist: { default: true },
    transform: { default: false },
    offset: {
      default: 6,
      fromAttribute: (value) => {
        if (value == null) {
          return undefined
        }
        try {
          return JSON.parse(value) as number | OffsetOptions
        } catch {
          return undefined
        }
      },
      toAttribute: JSON.stringify,
    },
    flip: { default: true },
    shift: { default: true },
    overlap: { default: false },
    fitViewport: { default: false },
    sameWidth: { default: false },
    sameHeight: { default: false },
    inline: { default: false },
    hide: { default: false },

    boundary: { default: "clippingAncestors" },
    rootBoundary: { default: "viewport" },
    overflowPadding: { default: 4 },
    elementContext: { default: "floating" },
    altBoundary: { default: true },
  }

/**
 * @group OverlayPositioner
 */
export interface OverlayPositionerDataAttributes {
  "data-side": "top" | "right" | "bottom" | "left"
  "data-align": "start" | "center" | "end"
  "data-mounted": ""
}

/**
 * @internal
 */
export interface OverlayPositionerEvents {}

/**
 * @internal
 */
export const overlayPositionerEvents: EventDeclarations<OverlayPositionerEvents> =
  {}
