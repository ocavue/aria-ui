import { BaseElement, type SignalState } from "@aria-ui/core";

import type { ListboxProps } from "./listbox.props"
import { useListbox } from "./listbox.state"

/**
 * A custom Listbox element.
 *
 * Properties: {@link ListboxProps}
 *
 * @group Listbox
 */
export class ListboxElement extends BaseElement implements ListboxProps {
  private _s: SignalState<ListboxProps>;

  constructor(props?: Partial<ListboxProps>) {
    super();
    this._s = useListbox(this, props);
  }

  /** @hidden */ get value(): ListboxProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: ListboxProps["value"]) { this._s.value.value = v }
  /** @hidden */ get onValueChange(): ListboxProps["onValueChange"] { return this._s.onValueChange.value }
  /** @hidden */ set onValueChange(v: ListboxProps["onValueChange"]) { this._s.onValueChange.value = v }
  /** @hidden */ get selectionMode(): ListboxProps["selectionMode"] { return this._s.selectionMode.value }
  /** @hidden */ set selectionMode(v: ListboxProps["selectionMode"]) { this._s.selectionMode.value = v }
  /** @hidden */ get query(): ListboxProps["query"] { return this._s.query.value }
  /** @hidden */ set query(v: ListboxProps["query"]) { this._s.query.value = v }
  /** @hidden */ get filter(): ListboxProps["filter"] { return this._s.filter.value }
  /** @hidden */ set filter(v: ListboxProps["filter"]) { this._s.filter.value = v }
  /** @hidden */ get onKeydownHandlerAdd(): ListboxProps["onKeydownHandlerAdd"] { return this._s.onKeydownHandlerAdd.value }
  /** @hidden */ set onKeydownHandlerAdd(v: ListboxProps["onKeydownHandlerAdd"]) { this._s.onKeydownHandlerAdd.value = v }
}
