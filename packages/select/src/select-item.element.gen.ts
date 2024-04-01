import { BaseElement, type SingalState } from "@aria-ui/core";

import type { SelectItemProps } from "./select-item.props"
import { useSelectItem } from "./select-item.state"

/**
 * A custom SelectItem element.
 *
 * Properties: {@link SelectItemProps}
 *
 * @group SelectItem
 */
export class SelectItemElement extends BaseElement implements SelectItemProps {
  private _s: SingalState<SelectItemProps>;

  constructor(props?: Partial<SelectItemProps>) {
    super();
    this._s = useSelectItem(this, props);
  }

  /** @hidden */ get value(): SelectItemProps["value"] { return this._s.value.value }
  /** @hidden */ set value(v: SelectItemProps["value"]) { this._s.value.value = v }
}
