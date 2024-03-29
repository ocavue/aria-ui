import { BaseElement } from "@aria-ui/core"

import { useOverlayAnchor } from "./overlay-anchor.state"

/**
 * A custom OverlayAnchor element.
 *
 * @group OverlayAnchor
 */
export class OverlayAnchorElement extends BaseElement {
  constructor() {
    super()
    useOverlayAnchor(this)
  }
}
