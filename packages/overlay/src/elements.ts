import { defineCustomElement } from "@aria-ui/core"

import { useOverlayAnchor } from "./overlay-anchor.setup"
import {
  overlayAnchorEvents,
  overlayAnchorProps,
  type OverlayAnchorEvents,
  type OverlayAnchorProps,
} from "./overlay-anchor.types"
import { useOverlayPositioner } from "./overlay-positioner.setup"
import {
  overlayPositionerEvents,
  overlayPositionerProps,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
} from "./overlay-positioner.types"
import { useOverlayRoot } from "./overlay-root.setup"
import {
  overlayRootEvents,
  overlayRootProps,
  type OverlayRootEvents,
  type OverlayRootProps,
} from "./overlay-root.types"

/**
 * A custom OverlayAnchor element.
 *
 * @group OverlayAnchor
 */
export class OverlayAnchorElement extends defineCustomElement<
  OverlayAnchorProps,
  OverlayAnchorEvents
>({
  props: overlayAnchorProps,
  events: overlayAnchorEvents,
  setup: useOverlayAnchor,
}) {}

/**
 * A custom OverlayPositioner element.
 *
 * @group OverlayPositioner
 */
export class OverlayPositionerElement extends defineCustomElement<
  OverlayPositionerProps,
  OverlayPositionerEvents
>({
  props: overlayPositionerProps,
  events: overlayPositionerEvents,
  setup: useOverlayPositioner,
}) {}

/**
 * A custom OverlayRoot element.
 *
 * @group OverlayRoot
 */
export class OverlayRootElement extends defineCustomElement<
  OverlayRootProps,
  OverlayRootEvents
>({
  props: overlayRootProps,
  events: overlayRootEvents,
  setup: useOverlayRoot,
}) {}

export * from "./overlay-anchor.types"
export * from "./overlay-anchor.setup"
export * from "./overlay-positioner.types"
export * from "./overlay-positioner.setup"
export * from "./overlay-root.types"
export * from "./overlay-root.setup"
