import { BaseElement, type SignalState } from "@aria-ui/core";

import type { MenuContentProps } from "./menu-content.props"
import { useMenuContent } from "./menu-content.state"

/**
 * A custom MenuContent element.
 *
 * Properties: {@link MenuContentProps}
 *
 * @group MenuContent
 */
export class MenuContentElement extends BaseElement implements MenuContentProps {
  private _s: SignalState<MenuContentProps>;

  constructor(props?: Partial<MenuContentProps>) {
    super();
    this._s = useMenuContent(this, props);
  }

  /** @hidden */ get strategy(): MenuContentProps["strategy"] { return this._s.strategy.value }
  /** @hidden */ set strategy(v: MenuContentProps["strategy"]) { this._s.strategy.value = v }
  /** @hidden */ get placement(): MenuContentProps["placement"] { return this._s.placement.value }
  /** @hidden */ set placement(v: MenuContentProps["placement"]) { this._s.placement.value = v }
  /** @hidden */ get autoUpdate(): MenuContentProps["autoUpdate"] { return this._s.autoUpdate.value }
  /** @hidden */ set autoUpdate(v: MenuContentProps["autoUpdate"]) { this._s.autoUpdate.value = v }
  /** @hidden */ get hoist(): MenuContentProps["hoist"] { return this._s.hoist.value }
  /** @hidden */ set hoist(v: MenuContentProps["hoist"]) { this._s.hoist.value = v }
  /** @hidden */ get transform(): MenuContentProps["transform"] { return this._s.transform.value }
  /** @hidden */ set transform(v: MenuContentProps["transform"]) { this._s.transform.value = v }
  /** @hidden */ get offset(): MenuContentProps["offset"] { return this._s.offset.value }
  /** @hidden */ set offset(v: MenuContentProps["offset"]) { this._s.offset.value = v }
  /** @hidden */ get flip(): MenuContentProps["flip"] { return this._s.flip.value }
  /** @hidden */ set flip(v: MenuContentProps["flip"]) { this._s.flip.value = v }
  /** @hidden */ get shift(): MenuContentProps["shift"] { return this._s.shift.value }
  /** @hidden */ set shift(v: MenuContentProps["shift"]) { this._s.shift.value = v }
  /** @hidden */ get overlap(): MenuContentProps["overlap"] { return this._s.overlap.value }
  /** @hidden */ set overlap(v: MenuContentProps["overlap"]) { this._s.overlap.value = v }
  /** @hidden */ get fitViewport(): MenuContentProps["fitViewport"] { return this._s.fitViewport.value }
  /** @hidden */ set fitViewport(v: MenuContentProps["fitViewport"]) { this._s.fitViewport.value = v }
  /** @hidden */ get sameWidth(): MenuContentProps["sameWidth"] { return this._s.sameWidth.value }
  /** @hidden */ set sameWidth(v: MenuContentProps["sameWidth"]) { this._s.sameWidth.value = v }
  /** @hidden */ get sameHeight(): MenuContentProps["sameHeight"] { return this._s.sameHeight.value }
  /** @hidden */ set sameHeight(v: MenuContentProps["sameHeight"]) { this._s.sameHeight.value = v }
  /** @hidden */ get inline(): MenuContentProps["inline"] { return this._s.inline.value }
  /** @hidden */ set inline(v: MenuContentProps["inline"]) { this._s.inline.value = v }
  /** @hidden */ get hide(): MenuContentProps["hide"] { return this._s.hide.value }
  /** @hidden */ set hide(v: MenuContentProps["hide"]) { this._s.hide.value = v }
  /** @hidden */ get boundary(): MenuContentProps["boundary"] { return this._s.boundary.value }
  /** @hidden */ set boundary(v: MenuContentProps["boundary"]) { this._s.boundary.value = v }
  /** @hidden */ get rootBoundary(): MenuContentProps["rootBoundary"] { return this._s.rootBoundary.value }
  /** @hidden */ set rootBoundary(v: MenuContentProps["rootBoundary"]) { this._s.rootBoundary.value = v }
  /** @hidden */ get overflowPadding(): MenuContentProps["overflowPadding"] { return this._s.overflowPadding.value }
  /** @hidden */ set overflowPadding(v: MenuContentProps["overflowPadding"]) { this._s.overflowPadding.value = v }
  /** @hidden */ get elementContext(): MenuContentProps["elementContext"] { return this._s.elementContext.value }
  /** @hidden */ set elementContext(v: MenuContentProps["elementContext"]) { this._s.elementContext.value = v }
  /** @hidden */ get altBoundary(): MenuContentProps["altBoundary"] { return this._s.altBoundary.value }
  /** @hidden */ set altBoundary(v: MenuContentProps["altBoundary"]) { this._s.altBoundary.value = v }
  /** @hidden */ get onEscapeKeyDown(): MenuContentProps["onEscapeKeyDown"] { return this._s.onEscapeKeyDown.value }
  /** @hidden */ set onEscapeKeyDown(v: MenuContentProps["onEscapeKeyDown"]) { this._s.onEscapeKeyDown.value = v }
  /** @hidden */ get onPointerDownOutside(): MenuContentProps["onPointerDownOutside"] { return this._s.onPointerDownOutside.value }
  /** @hidden */ set onPointerDownOutside(v: MenuContentProps["onPointerDownOutside"]) { this._s.onPointerDownOutside.value = v }
  /** @hidden */ get onFocusOutside(): MenuContentProps["onFocusOutside"] { return this._s.onFocusOutside.value }
  /** @hidden */ set onFocusOutside(v: MenuContentProps["onFocusOutside"]) { this._s.onFocusOutside.value = v }
  /** @hidden */ get onInteractOutside(): MenuContentProps["onInteractOutside"] { return this._s.onInteractOutside.value }
  /** @hidden */ set onInteractOutside(v: MenuContentProps["onInteractOutside"]) { this._s.onInteractOutside.value = v }
  /** @hidden */ get onKeydownHandlerAdd(): MenuContentProps["onKeydownHandlerAdd"] { return this._s.onKeydownHandlerAdd.value }
  /** @hidden */ set onKeydownHandlerAdd(v: MenuContentProps["onKeydownHandlerAdd"]) { this._s.onKeydownHandlerAdd.value = v }
}
