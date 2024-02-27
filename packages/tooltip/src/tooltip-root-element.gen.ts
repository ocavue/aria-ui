import { BaseElement, type SingalState } from "@aria-ui/core";

import type { TooltipRootProps } from "./tooltip-root-props"
import { useTooltipRoot } from "./tooltip-root-state"

/**
 * A custom TooltipRoot element.
 *
 * Properties: {@link TooltipRootProps}
 *
 * @group TooltipRoot
 */
export class TooltipRootElement extends BaseElement implements TooltipRootProps {
  private _s: SingalState<TooltipRootProps>;

  constructor(props?: Partial<TooltipRootProps>) {
    super();
    this._s = useTooltipRoot(this, props);
  }

  /** @hidden */ get openDelay(): TooltipRootProps["openDelay"] { return this._s.openDelay.value }
  /** @hidden */ set openDelay(v: TooltipRootProps["openDelay"]) { this._s.openDelay.value = v }
  /** @hidden */ get closeDelay(): TooltipRootProps["closeDelay"] { return this._s.closeDelay.value }
  /** @hidden */ set closeDelay(v: TooltipRootProps["closeDelay"]) { this._s.closeDelay.value = v }
}