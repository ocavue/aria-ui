import { BaseElement, type SingalState } from "@aria-ui/core";

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
  private _s: SingalState<ListboxProps>;

  constructor(props?: Partial<ListboxProps>) {
    super();
    this._s = useListbox(this, props);
  }

  /** @hidden */ get selectionMode(): ListboxProps["selectionMode"] { return this._s.selectionMode.value }
  /** @hidden */ set selectionMode(v: ListboxProps["selectionMode"]) { this._s.selectionMode.value = v }
  /** @hidden */ get onKeydownHandlerAdd(): ListboxProps["onKeydownHandlerAdd"] { return this._s.onKeydownHandlerAdd.value }
  /** @hidden */ set onKeydownHandlerAdd(v: ListboxProps["onKeydownHandlerAdd"]) { this._s.onKeydownHandlerAdd.value = v }
}
