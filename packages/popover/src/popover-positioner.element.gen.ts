import { BaseElement, type SingalState } from "@aria-ui/core";

import type { PopoverPositionerProps } from "./popover-positioner.props"
import { usePopoverPositioner } from "./popover-positioner.state"

/**
 * A custom PopoverPositioner element.
 *
 * Properties: {@link PopoverPositionerProps}
 *
 * @group PopoverPositioner
 */
export class PopoverPositionerElement extends BaseElement implements PopoverPositionerProps {
  private _s: SingalState<PopoverPositionerProps>;

  constructor(props?: Partial<PopoverPositionerProps>) {
    super();
    this._s = usePopoverPositioner(this, props);
  }

  /** @hidden */ get strategy(): PopoverPositionerProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: PopoverPositionerProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): PopoverPositionerProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: PopoverPositionerProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): PopoverPositionerProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: PopoverPositionerProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): PopoverPositionerProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: PopoverPositionerProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get offset(): PopoverPositionerProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: PopoverPositionerProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): PopoverPositionerProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: PopoverPositionerProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): PopoverPositionerProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: PopoverPositionerProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): PopoverPositionerProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: PopoverPositionerProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): PopoverPositionerProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: PopoverPositionerProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): PopoverPositionerProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: PopoverPositionerProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): PopoverPositionerProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: PopoverPositionerProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): PopoverPositionerProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: PopoverPositionerProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): PopoverPositionerProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: PopoverPositionerProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): PopoverPositionerProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: PopoverPositionerProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): PopoverPositionerProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: PopoverPositionerProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): PopoverPositionerProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: PopoverPositionerProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): PopoverPositionerProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: PopoverPositionerProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): PopoverPositionerProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: PopoverPositionerProps["altBoundary"]) { this._s.altBoundary.value = v }
  /** @hidden */ get open(): PopoverPositionerProps["open"] { return this._s.open.value }
  /** @hidden */ set open(v: PopoverPositionerProps["open"]) { this._s.open.value = v }
  /** @hidden */ get identifier(): PopoverPositionerProps["identifier"] { return this._s.identifier.value }
  /** @hidden */ set identifier(v: PopoverPositionerProps["identifier"]) { this._s.identifier.value = v }
}
