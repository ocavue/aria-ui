import { ElementBuilder } from "@aria-ui/core"

import { defaultOverlayAnchorProps, type OverlayAnchorProps } from "./overlay-anchor.props"
import { useOverlayAnchor } from "./overlay-anchor.state"

/**
 * A custom OverlayAnchor element.
 *
 * @group OverlayAnchor
 */
export class OverlayAnchorElement extends ElementBuilder<OverlayAnchorProps>(
  useOverlayAnchor,
  defaultOverlayAnchorProps,
) {}
