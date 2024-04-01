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
  /** @hidden */ get open(): PopoverRootProps["open"] { return this._s.open.value }
  /** @hidden */ set open(v: PopoverRootProps["open"]) { this._s.open.value = v }
  /** @hidden */ get onOpenChange(): PopoverRootProps["onOpenChange"] { return this._s.onOpenChange.value }
  /** @hidden */ set onOpenChange(v: PopoverRootProps["onOpenChange"]) { this._s.onOpenChange.value = v }
}
