import { ElementBuilder } from "@aria-ui/core"

import { defaultOverlayRootProps, type OverlayRootProps } from "./overlay-root.props"
import { useOverlayRoot } from "./overlay-root.state"

/**
 * A custom OverlayRoot element.
 *
 * @group OverlayRoot
 */
export class OverlayRootElement extends ElementBuilder<OverlayRootProps>(
  useOverlayRoot,
  defaultOverlayRootProps,
) {}
