import { BaseElement, type SingalState } from "@aria-ui/core";
import type { TooltipPositionerProps } from "./tooltip-positioner-props"
import { useTooltipPositioner } from "./tooltip-positioner-state"

/**
 * A custom TooltipPositioner element.
 *
 * Properties: {@link TooltipPositionerProps}
 *
 * @group TooltipPositioner
 */
export class TooltipPositionerElement extends BaseElement implements TooltipPositionerProps {
	private _s: SingalState<TooltipPositionerProps>;

  constructor(props?: Partial<TooltipPositionerProps>) {
    super();
    this._s = useTooltipPositioner(this, props);
  }

	/** @hidden */ get strategy(): TooltipPositionerProps["strategy"] { return this._s.strategy.value }
	/** @hidden */ set strategy(v: TooltipPositionerProps["strategy"]) { this._s.strategy.value = v }
	/** @hidden */ get placement(): TooltipPositionerProps["placement"] { return this._s.placement.value }
	/** @hidden */ set placement(v: TooltipPositionerProps["placement"]) { this._s.placement.value = v }
	/** @hidden */ get autoUpdate(): TooltipPositionerProps["autoUpdate"] { return this._s.autoUpdate.value }
	/** @hidden */ set autoUpdate(v: TooltipPositionerProps["autoUpdate"]) { this._s.autoUpdate.value = v }
	/** @hidden */ get hoist(): TooltipPositionerProps["hoist"] { return this._s.hoist.value }
	/** @hidden */ set hoist(v: TooltipPositionerProps["hoist"]) { this._s.hoist.value = v }
	/** @hidden */ get offset(): TooltipPositionerProps["offset"] { return this._s.offset.value }
	/** @hidden */ set offset(v: TooltipPositionerProps["offset"]) { this._s.offset.value = v }
	/** @hidden */ get flip(): TooltipPositionerProps["flip"] { return this._s.flip.value }
	/** @hidden */ set flip(v: TooltipPositionerProps["flip"]) { this._s.flip.value = v }
	/** @hidden */ get shift(): TooltipPositionerProps["shift"] { return this._s.shift.value }
	/** @hidden */ set shift(v: TooltipPositionerProps["shift"]) { this._s.shift.value = v }
	/** @hidden */ get overlap(): TooltipPositionerProps["overlap"] { return this._s.overlap.value }
	/** @hidden */ set overlap(v: TooltipPositionerProps["overlap"]) { this._s.overlap.value = v }
	/** @hidden */ get fitViewport(): TooltipPositionerProps["fitViewport"] { return this._s.fitViewport.value }
	/** @hidden */ set fitViewport(v: TooltipPositionerProps["fitViewport"]) { this._s.fitViewport.value = v }
	/** @hidden */ get sameWidth(): TooltipPositionerProps["sameWidth"] { return this._s.sameWidth.value }
	/** @hidden */ set sameWidth(v: TooltipPositionerProps["sameWidth"]) { this._s.sameWidth.value = v }
	/** @hidden */ get sameHeight(): TooltipPositionerProps["sameHeight"] { return this._s.sameHeight.value }
	/** @hidden */ set sameHeight(v: TooltipPositionerProps["sameHeight"]) { this._s.sameHeight.value = v }
	/** @hidden */ get inline(): TooltipPositionerProps["inline"] { return this._s.inline.value }
	/** @hidden */ set inline(v: TooltipPositionerProps["inline"]) { this._s.inline.value = v }
	/** @hidden */ get hide(): TooltipPositionerProps["hide"] { return this._s.hide.value }
	/** @hidden */ set hide(v: TooltipPositionerProps["hide"]) { this._s.hide.value = v }
	/** @hidden */ get boundary(): TooltipPositionerProps["boundary"] { return this._s.boundary.value }
	/** @hidden */ set boundary(v: TooltipPositionerProps["boundary"]) { this._s.boundary.value = v }
	/** @hidden */ get rootBoundary(): TooltipPositionerProps["rootBoundary"] { return this._s.rootBoundary.value }
	/** @hidden */ set rootBoundary(v: TooltipPositionerProps["rootBoundary"]) { this._s.rootBoundary.value = v }
	/** @hidden */ get overflowPadding(): TooltipPositionerProps["overflowPadding"] { return this._s.overflowPadding.value }
	/** @hidden */ set overflowPadding(v: TooltipPositionerProps["overflowPadding"]) { this._s.overflowPadding.value = v }
	/** @hidden */ get elementContext(): TooltipPositionerProps["elementContext"] { return this._s.elementContext.value }
	/** @hidden */ set elementContext(v: TooltipPositionerProps["elementContext"]) { this._s.elementContext.value = v }
	/** @hidden */ get altBoundary(): TooltipPositionerProps["altBoundary"] { return this._s.altBoundary.value }
	/** @hidden */ set altBoundary(v: TooltipPositionerProps["altBoundary"]) { this._s.altBoundary.value = v }
}