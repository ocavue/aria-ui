import { BaseElement, type SingalState } from "@aria-ui/core";

import type { MenuRootProps } from "./menu-root.props"
import { useMenuRoot } from "./menu-root.state"

/**
 * A custom MenuRoot element.
 *
 * Properties: {@link MenuRootProps}
 *
 * @group MenuRoot
 */
export class MenuRootElement extends BaseElement implements MenuRootProps {
  private _s: SingalState<MenuRootProps>;

  constructor(props?: Partial<MenuRootProps>) {
    super();
    this._s = useMenuRoot(this, props);
  }

  /** @hidden */ get defaultOpen(): MenuRootProps["defaultOpen"] { return this._s.defaultOpen.value }
  /** @hidden */ set defaultOpen(v: MenuRootProps["defaultOpen"]) { this._s.defaultOpen.value = v }
  /** @hidden */ get open(): MenuRootProps["open"] { return this._s.open.value }
  /** @hidden */ set open(v: MenuRootProps["open"]) { this._s.open.value = v }
  /** @hidden */ get onOpenChange(): MenuRootProps["onOpenChange"] { return this._s.onOpenChange.value }
  /** @hidden */ set onOpenChange(v: MenuRootProps["onOpenChange"]) { this._s.onOpenChange.value = v }
}
