import { BaseElement, type SingalState } from "@aria-ui/core";

import type { PopoverRootProps } from "./popover-root.props"
import { usePopoverRoot } from "./popover-root.state"

/**
 * A custom PopoverRoot element.
 *
 * Properties: {@link PopoverRootProps}
 *
 * @group PopoverRoot
 */
export class PopoverRootElement extends BaseElement implements PopoverRootProps {
  private _s: SingalState<PopoverRootProps>;

  constructor(props?: Partial<PopoverRootProps>) {
    super();
    this._s = usePopoverRoot(this, props);
  }

  /** @hidden */ get defaultOpen(): PopoverRootProps["defaultOpen"] { return this._s.defaultOpen.value }
  /** @hidden */ set defaultOpen(v: PopoverRootProps["defaultOpen"]) { this._s.defaultOpen.value = v }
}
