import { ElementBuilder } from "@aria-ui/core"

import { overlayAnchorProps, type OverlayAnchorProps } from "./overlay-anchor.props"
import { useOverlayAnchor } from "./overlay-anchor.state"

/**
 * A custom OverlayAnchor element.
 *
 * @group OverlayAnchor
 */
export class OverlayAnchorElement extends ElementBuilder<OverlayAnchorProps>(
  useOverlayAnchor,
  overlayAnchorProps,
) {}
