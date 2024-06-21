import { ElementBuilder } from "@aria-ui/core"

import { defaultOverlayPositionerProps, type OverlayPositionerProps } from "./overlay-positioner.props"
import { useOverlayPositioner } from "./overlay-positioner.state"

/**
 * A custom OverlayPositioner element.
 *
 * @group OverlayPositioner
 */
export class OverlayPositionerElement extends ElementBuilder<OverlayPositionerProps>(
  useOverlayPositioner,
  defaultOverlayPositionerProps,
) {}
