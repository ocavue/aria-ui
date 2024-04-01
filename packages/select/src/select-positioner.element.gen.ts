import { BaseElement, type SingalState } from "@aria-ui/core";

import type { SelectPositionerProps } from "./select-positioner.props"
import { useSelectPositioner } from "./select-positioner.state"

/**
 * A custom SelectPositioner element.
 *
 * Properties: {@link SelectPositionerProps}
 *
 * @group SelectPositioner
 */
export class SelectPositionerElement extends BaseElement implements SelectPositionerProps {
  private _s: SingalState<SelectPositionerProps>;

  constructor(props?: Partial<SelectPositionerProps>) {
    super();
    this._s = useSelectPositioner(this, props);
  }

  /** @hidden */ get strategy(): SelectPositionerProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: SelectPositionerProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): SelectPositionerProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: SelectPositionerProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): SelectPositionerProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: SelectPositionerProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): SelectPositionerProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: SelectPositionerProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get transform(): SelectPositionerProps["transform"] { return this._s.transform.value }
  /** @hidden */ set transform(v: SelectPositionerProps["transform"]) { this._s.transform.value = v }
  /** @hidden */ get offset(): SelectPositionerProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: SelectPositionerProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): SelectPositionerProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: SelectPositionerProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): SelectPositionerProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: SelectPositionerProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): SelectPositionerProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: SelectPositionerProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): SelectPositionerProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: SelectPositionerProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): SelectPositionerProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: SelectPositionerProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): SelectPositionerProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: SelectPositionerProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): SelectPositionerProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: SelectPositionerProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): SelectPositionerProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: SelectPositionerProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): SelectPositionerProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: SelectPositionerProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): SelectPositionerProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: SelectPositionerProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): SelectPositionerProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: SelectPositionerProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): SelectPositionerProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: SelectPositionerProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): SelectPositionerProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: SelectPositionerProps["altBoundary"]) { this._s.altBoundary.value = v }
  /** @hidden */ get onEscapeKeyDown(): SelectPositionerProps["onEscapeKeyDown"] { return this._s.onEscapeKeyDown.value }
  /** @hidden */ set onEscapeKeyDown(v: SelectPositionerProps["onEscapeKeyDown"]) { this._s.onEscapeKeyDown.value = v }
  /** @hidden */ get onPointerDownOutside(): SelectPositionerProps["onPointerDownOutside"] { return this._s.onPointerDownOutside.value }
  /** @hidden */ set onPointerDownOutside(v: SelectPositionerProps["onPointerDownOutside"]) { this._s.onPointerDownOutside.value = v }
  /** @hidden */ get onFocusOutside(): SelectPositionerProps["onFocusOutside"] { return this._s.onFocusOutside.value }
  /** @hidden */ set onFocusOutside(v: SelectPositionerProps["onFocusOutside"]) { this._s.onFocusOutside.value = v }
  /** @hidden */ get onInteractOutside(): SelectPositionerProps["onInteractOutside"] { return this._s.onInteractOutside.value }
  /** @hidden */ set onInteractOutside(v: SelectPositionerProps["onInteractOutside"]) { this._s.onInteractOutside.value = v }
}
