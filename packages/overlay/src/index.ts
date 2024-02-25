/**
 * A collection of low-level utilities for creating custom elements that display
 * floating content.
 *
 * You probably won't need to use this module directly.
 *
 * @module
 */

export { useOverlayAnchor } from "./overlay-anchor-state"
export {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from "./overlay-positioner-props"
export { useOverlayPositioner } from "./overlay-positioner-state"
export { useOverlayRoot } from "./overlay-root-state"
