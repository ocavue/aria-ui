import { defineCustomElement } from "@aria-ui/core"

import { useOverlayPositioner } from "./overlay-positioner.setup"
import { overlayPositionerEvents, overlayPositionerProps, type OverlayPositionerEvents, type OverlayPositionerProps } from "./overlay-positioner.types"

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
