import { defineCustomElement } from "@aria-ui/core"

import { useOverlayAnchor } from "./overlay-anchor.setup"
import { overlayAnchorEvents, overlayAnchorProps, type OverlayAnchorEvents, type OverlayAnchorProps } from "./overlay-anchor.types"

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
