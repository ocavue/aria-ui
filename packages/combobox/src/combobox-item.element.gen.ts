import { BaseElement, type SignalState } from "@aria-ui/core";

import type { ComboboxItemProps } from "./combobox-item.props"
import { useComboboxItem } from "./combobox-item.state"

/**
 * A custom ComboboxItem element.
 *
 * Properties: {@link ComboboxItemProps}
 *
 * @group ComboboxItem
 */
export class ComboboxItemElement extends BaseElement implements ComboboxItemProps {
  private _s: SignalState<ComboboxItemProps>;

  constructor(props?: Partial<ComboboxItemProps>) {
    super();
    this._s = useComboboxItem(this, props);
  }

  /** @hidden */ get value(): ComboboxItemProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: ComboboxItemProps["value"]) { this._s.value.value = v }
  /** @hidden */ get onSelect(): ComboboxItemProps["onSelect"] { return this._s.onSelect.value }
  /** @hidden */ set onSelect(v: ComboboxItemProps["onSelect"]) { this._s.onSelect.value = v }
}
