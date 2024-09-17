import { defineCustomElement } from "@aria-ui/core"

import { useOverlayRoot } from "./overlay-root.setup"
import { overlayRootEvents, overlayRootProps, type OverlayRootEvents, type OverlayRootProps } from "./overlay-root.types"

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
