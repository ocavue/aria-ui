/**
 * A collection of low-level utilities for creating custom elements that display
 * floating content.
 *
 * You probably won't need to use this module directly.
 *
 * @module
 */

export { OverlayAnchorElement } from "./overlay-anchor.element.gen"
export { useOverlayAnchor } from "./overlay-anchor.state"
export { OverlayPositionerElement } from "./overlay-positioner.element.gen"
export {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from "./overlay-positioner.props"
export {
  useOverlayPositioner,
  useOverlayPositionerState,
} from "./overlay-positioner.state"
export { OverlayRootElement } from "./overlay-root.element.gen"
export { useOverlayRoot } from "./overlay-root.state"
