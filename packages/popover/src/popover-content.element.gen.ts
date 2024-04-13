import { BaseElement, type SignalState } from "@aria-ui/core";

import type { PopoverContentProps } from "./popover-content.props"
import { usePopoverContent } from "./popover-content.state"

/**
 * A custom PopoverContent element.
 *
 * Properties: {@link PopoverContentProps}
 *
 * @group PopoverContent
 */
export class PopoverContentElement extends BaseElement implements PopoverContentProps {
  private _s: SignalState<PopoverContentProps>;

  constructor(props?: Partial<PopoverContentProps>) {
    super();
    this._s = usePopoverContent(this, props);
  }

  /** @hidden */ get strategy(): PopoverContentProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: PopoverContentProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): PopoverContentProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: PopoverContentProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): PopoverContentProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: PopoverContentProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): PopoverContentProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: PopoverContentProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get transform(): PopoverContentProps["transform"] { return this._s.transform.value }
  /** @hidden */ set transform(v: PopoverContentProps["transform"]) { this._s.transform.value = v }
  /** @hidden */ get offset(): PopoverContentProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: PopoverContentProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): PopoverContentProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: PopoverContentProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): PopoverContentProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: PopoverContentProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): PopoverContentProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: PopoverContentProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): PopoverContentProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: PopoverContentProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): PopoverContentProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: PopoverContentProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): PopoverContentProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: PopoverContentProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): PopoverContentProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: PopoverContentProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): PopoverContentProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: PopoverContentProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): PopoverContentProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: PopoverContentProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): PopoverContentProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: PopoverContentProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): PopoverContentProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: PopoverContentProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): PopoverContentProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: PopoverContentProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): PopoverContentProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: PopoverContentProps["altBoundary"]) { this._s.altBoundary.value = v }
  /** @hidden */ get onEscapeKeyDown(): PopoverContentProps["onEscapeKeyDown"] { return this._s.onEscapeKeyDown.value }
  /** @hidden */ set onEscapeKeyDown(v: PopoverContentProps["onEscapeKeyDown"]) { this._s.onEscapeKeyDown.value = v }
  /** @hidden */ get onPointerDownOutside(): PopoverContentProps["onPointerDownOutside"] { return this._s.onPointerDownOutside.value }
  /** @hidden */ set onPointerDownOutside(v: PopoverContentProps["onPointerDownOutside"]) { this._s.onPointerDownOutside.value = v }
  /** @hidden */ get onFocusOutside(): PopoverContentProps["onFocusOutside"] { return this._s.onFocusOutside.value }
  /** @hidden */ set onFocusOutside(v: PopoverContentProps["onFocusOutside"]) { this._s.onFocusOutside.value = v }
  /** @hidden */ get onInteractOutside(): PopoverContentProps["onInteractOutside"] { return this._s.onInteractOutside.value }
  /** @hidden */ set onInteractOutside(v: PopoverContentProps["onInteractOutside"]) { this._s.onInteractOutside.value = v }
}
