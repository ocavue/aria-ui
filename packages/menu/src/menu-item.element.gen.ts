import { BaseElement, type SingalState } from "@aria-ui/core";

import type { MenuItemProps } from "./menu-item.props"
import { useMenuItem } from "./menu-item.state"

/**
 * A custom MenuItem element.
 *
 * Properties: {@link MenuItemProps}
 *
 * @group MenuItem
 */
export class MenuItemElement extends BaseElement implements MenuItemProps {
  private _s: SingalState<MenuItemProps>;

  constructor(props?: Partial<MenuItemProps>) {
    super();
    this._s = useMenuItem(this, props);
  }

  /** @hidden */ get value(): MenuItemProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: MenuItemProps["value"]) { this._s.value.value = v }
  /** @hidden */ get query(): MenuItemProps["query"] { return this._s.query.value }
  /** @hidden */ set query(v: MenuItemProps["query"]) { this._s.query.value = v }
  /** @hidden */ get filter(): MenuItemProps["filter"] { return this._s.filter.value }
  /** @hidden */ set filter(v: MenuItemProps["filter"]) { this._s.filter.value = v }
  /** @hidden */ get onSelect(): MenuItemProps["onSelect"] { return this._s.onSelect.value }
  /** @hidden */ set onSelect(v: MenuItemProps["onSelect"]) { this._s.onSelect.value = v }
}
