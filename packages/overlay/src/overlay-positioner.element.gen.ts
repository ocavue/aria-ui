import { BaseElement, type SingalState } from "@aria-ui/core";

import type { OverlayPositionerProps } from "./overlay-positioner.props"
import { useOverlayPositioner } from "./overlay-positioner.state"

/**
 * A custom OverlayPositioner element.
 *
 * Properties: {@link OverlayPositionerProps}
 *
 * @group OverlayPositioner
 */
export class OverlayPositionerElement extends BaseElement implements OverlayPositionerProps {
  private _s: SingalState<OverlayPositionerProps>;

  constructor(props?: Partial<OverlayPositionerProps>) {
    super();
    this._s = useOverlayPositioner(this, props);
  }

  /** @hidden */ get strategy(): OverlayPositionerProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: OverlayPositionerProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): OverlayPositionerProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: OverlayPositionerProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): OverlayPositionerProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: OverlayPositionerProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): OverlayPositionerProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: OverlayPositionerProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get offset(): OverlayPositionerProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: OverlayPositionerProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): OverlayPositionerProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: OverlayPositionerProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): OverlayPositionerProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: OverlayPositionerProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): OverlayPositionerProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: OverlayPositionerProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): OverlayPositionerProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: OverlayPositionerProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): OverlayPositionerProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: OverlayPositionerProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): OverlayPositionerProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: OverlayPositionerProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): OverlayPositionerProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: OverlayPositionerProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): OverlayPositionerProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: OverlayPositionerProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): OverlayPositionerProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: OverlayPositionerProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): OverlayPositionerProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: OverlayPositionerProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): OverlayPositionerProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: OverlayPositionerProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): OverlayPositionerProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: OverlayPositionerProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): OverlayPositionerProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: OverlayPositionerProps["altBoundary"]) { this._s.altBoundary.value = v }
}
