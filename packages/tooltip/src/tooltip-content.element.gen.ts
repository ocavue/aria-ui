import { BaseElement, type SignalState } from "@aria-ui/core";

import type { TooltipContentProps } from "./tooltip-content.props"
import { useTooltipContent } from "./tooltip-content.state"

/**
 * A custom TooltipContent element.
 *
 * Properties: {@link TooltipContentProps}
 *
 * @group TooltipContent
 */
export class TooltipContentElement extends BaseElement implements TooltipContentProps {
  private _s: SignalState<TooltipContentProps>;

  constructor(props?: Partial<TooltipContentProps>) {
    super();
    this._s = useTooltipContent(this, props);
  }

  /** @hidden */ get strategy(): TooltipContentProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: TooltipContentProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): TooltipContentProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: TooltipContentProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): TooltipContentProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: TooltipContentProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): TooltipContentProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: TooltipContentProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get transform(): TooltipContentProps["transform"] { return this._s.transform.value }
  /** @hidden */ set transform(v: TooltipContentProps["transform"]) { this._s.transform.value = v }
  /** @hidden */ get offset(): TooltipContentProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: TooltipContentProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): TooltipContentProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: TooltipContentProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): TooltipContentProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: TooltipContentProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): TooltipContentProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: TooltipContentProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): TooltipContentProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: TooltipContentProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): TooltipContentProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: TooltipContentProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): TooltipContentProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: TooltipContentProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): TooltipContentProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: TooltipContentProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): TooltipContentProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: TooltipContentProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): TooltipContentProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: TooltipContentProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): TooltipContentProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: TooltipContentProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): TooltipContentProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: TooltipContentProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): TooltipContentProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: TooltipContentProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): TooltipContentProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: TooltipContentProps["altBoundary"]) { this._s.altBoundary.value = v }
}
