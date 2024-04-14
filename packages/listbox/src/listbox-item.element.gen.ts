import { BaseElement, type SignalState } from "@aria-ui/core";

import type { ListboxItemProps } from "./listbox-item.props"
import { useListboxItem } from "./listbox-item.state"

/**
 * A custom ListboxItem element.
 *
 * Properties: {@link ListboxItemProps}
 *
 * @group ListboxItem
 */
export class ListboxItemElement extends BaseElement implements ListboxItemProps {
  private _s: SignalState<ListboxItemProps>;

  constructor(props?: Partial<ListboxItemProps>) {
    super();
    this._s = useListboxItem(this, props);
  }

  /** @hidden */ get value(): ListboxItemProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: ListboxItemProps["value"]) { this._s.value.value = v }
  /** @hidden */ get onSelect(): ListboxItemProps["onSelect"] { return this._s.onSelect.value }
  /** @hidden */ set onSelect(v: ListboxItemProps["onSelect"]) { this._s.onSelect.value = v }
}
