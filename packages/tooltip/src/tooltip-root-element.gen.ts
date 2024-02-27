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

  /** @hidden */ get delay(): TooltipRootProps["delay"] { return this._s.delay.value }
  /** @hidden */ set delay(v: TooltipRootProps["delay"]) { this._s.delay.value = v }
  /** @hidden */ get skipDelay(): TooltipRootProps["skipDelay"] { return this._s.skipDelay.value }
  /** @hidden */ set skipDelay(v: TooltipRootProps["skipDelay"]) { this._s.skipDelay.value = v }
}