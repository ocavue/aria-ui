import { ElementMixin } from "@aria-ui/core"

import { defaultOverlayRootProps, type OverlayRootProps } from "./overlay-root.props"
import { useOverlayRoot } from "./overlay-root.state"

/**
 * A custom OverlayRoot element.
 *
 * @group OverlayRoot
 */
export class OverlayRootElement extends ElementMixin<OverlayRootProps>(
  useOverlayRoot,
  defaultOverlayRootProps,
) {}
