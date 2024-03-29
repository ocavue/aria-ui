import { BaseElement, type SingalState } from "@aria-ui/core";

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
  private _s: SingalState<ListboxItemProps>;

  constructor(props?: Partial<ListboxItemProps>) {
    super();
    this._s = useListboxItem(this, props);
  }

  /** @hidden */ get value(): ListboxItemProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: ListboxItemProps["value"]) { this._s.value.value = v }
  /** @hidden */ get selectedValue(): ListboxItemProps["selectedValue"] { return this._s.selectedValue.value }
  /** @hidden */ set selectedValue(v: ListboxItemProps["selectedValue"]) { this._s.selectedValue.value = v }
  /** @hidden */ get query(): ListboxItemProps["query"] { return this._s.query.value }
  /** @hidden */ set query(v: ListboxItemProps["query"]) { this._s.query.value = v }
  /** @hidden */ get filter(): ListboxItemProps["filter"] { return this._s.filter.value }
  /** @hidden */ set filter(v: ListboxItemProps["filter"]) { this._s.filter.value = v }
  /** @hidden */ get onHighlight(): ListboxItemProps["onHighlight"] { return this._s.onHighlight.value }
  /** @hidden */ set onHighlight(v: ListboxItemProps["onHighlight"]) { this._s.onHighlight.value = v }
  /** @hidden */ get onSelect(): ListboxItemProps["onSelect"] { return this._s.onSelect.value }
  /** @hidden */ set onSelect(v: ListboxItemProps["onSelect"]) { this._s.onSelect.value = v }
}
