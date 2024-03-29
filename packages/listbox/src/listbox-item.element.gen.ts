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
}
