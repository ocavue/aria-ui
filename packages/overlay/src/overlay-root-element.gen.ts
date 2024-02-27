import { BaseElement } from "@aria-ui/core"

import { useOverlayRoot } from "./overlay-root-state"

/**
 * A custom OverlayRoot element.
 *
 * @group OverlayRoot
 */
export class OverlayRootElement extends BaseElement {
  constructor() {
    super()
    useOverlayRoot(this)
  }
}