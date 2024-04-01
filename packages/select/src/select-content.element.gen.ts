import { BaseElement, type SingalState } from "@aria-ui/core";

import type { SelectContentProps } from "./select-content.props"
import { useSelectContent } from "./select-content.state"

/**
 * A custom SelectContent element.
 *
 * Properties: {@link SelectContentProps}
 *
 * @group SelectContent
 */
export class SelectContentElement extends BaseElement implements SelectContentProps {
  private _s: SingalState<SelectContentProps>;

  constructor(props?: Partial<SelectContentProps>) {
    super();
    this._s = useSelectContent(this, props);
  }

  /** @hidden */ get strategy(): SelectContentProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: SelectContentProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): SelectContentProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: SelectContentProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): SelectContentProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: SelectContentProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): SelectContentProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: SelectContentProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get transform(): SelectContentProps["transform"] { return this._s.transform.value }
  /** @hidden */ set transform(v: SelectContentProps["transform"]) { this._s.transform.value = v }
  /** @hidden */ get offset(): SelectContentProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: SelectContentProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): SelectContentProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: SelectContentProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): SelectContentProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: SelectContentProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): SelectContentProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: SelectContentProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): SelectContentProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: SelectContentProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): SelectContentProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: SelectContentProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): SelectContentProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: SelectContentProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): SelectContentProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: SelectContentProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): SelectContentProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: SelectContentProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): SelectContentProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: SelectContentProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): SelectContentProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: SelectContentProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): SelectContentProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: SelectContentProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): SelectContentProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: SelectContentProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): SelectContentProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: SelectContentProps["altBoundary"]) { this._s.altBoundary.value = v }
  /** @hidden */ get onEscapeKeyDown(): SelectContentProps["onEscapeKeyDown"] { return this._s.onEscapeKeyDown.value }
  /** @hidden */ set onEscapeKeyDown(v: SelectContentProps["onEscapeKeyDown"]) { this._s.onEscapeKeyDown.value = v }
  /** @hidden */ get onPointerDownOutside(): SelectContentProps["onPointerDownOutside"] { return this._s.onPointerDownOutside.value }
  /** @hidden */ set onPointerDownOutside(v: SelectContentProps["onPointerDownOutside"]) { this._s.onPointerDownOutside.value = v }
  /** @hidden */ get onFocusOutside(): SelectContentProps["onFocusOutside"] { return this._s.onFocusOutside.value }
  /** @hidden */ set onFocusOutside(v: SelectContentProps["onFocusOutside"]) { this._s.onFocusOutside.value = v }
  /** @hidden */ get onInteractOutside(): SelectContentProps["onInteractOutside"] { return this._s.onInteractOutside.value }
  /** @hidden */ set onInteractOutside(v: SelectContentProps["onInteractOutside"]) { this._s.onInteractOutside.value = v }
}
