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
   * @default false
   */
  hoist: boolean

  // ------------------------------------------------------------------
  // Middlewares
  // ------------------------------------------------------------------

  /**
   * The distance between the reference and floating element.
   *
   * @default null
   */
  offset: OffsetOptions | null

  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default false
   */
  flip: boolean | Placement[]

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default false
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
   * @see https://floating-ui.com/docs/detectoverflow
   *
   * @default 'clippingAncestors'
   */
  boundary: Boundary

  /**
   * @see https://floating-ui.com/docs/detectoverflow
   *
   * @default 'viewport'
   */
  rootBoundary: RootBoundary

  /**
   * @see https://floating-ui.com/docs/detectoverflow
   *
   * @default 0
   */
  overflowPadding: number

  /**
   *
   * @see https://floating-ui.com/docs/detectoverflow
   *
   * @default 'floating'
   */
  elementContext: ElementContext

  /**
   * @see https://floating-ui.com/docs/detectoverflow
   *
   * @default true
   */
  altBoundary: boolean
}

/**
 * @hidden
 */
export const defaultOverlayPositionerProps = Object.freeze({
  strategy: "absolute",
  placement: "top",
  autoUpdate: true,
  hoist: false,

  offset: null,
  flip: false,
  shift: false,
  overlap: false,
  fitViewport: false,
  sameWidth: false,
  sameHeight: false,
  inline: false,
  hide: false,

  boundary: "clippingAncestors",
  rootBoundary: "viewport",
  overflowPadding: 0,
  elementContext: "floating",
  altBoundary: true,
}) satisfies OverlayPositionerProps
