import { BaseElement, type SingalState } from "@aria-ui/core";

import type { SelectValueProps } from "./select-value.props"
import { useSelectValue } from "./select-value.state"

/**
 * A custom SelectValue element.
 *
 * Properties: {@link SelectValueProps}
 *
 * @group SelectValue
 */
export class SelectValueElement extends BaseElement implements SelectValueProps {
  private _s: SingalState<SelectValueProps>;

  constructor(props?: Partial<SelectValueProps>) {
    super();
    this._s = useSelectValue(this, props);
  }

  /** @hidden */ get placeholder(): SelectValueProps["placeholder"] { return this._s.placeholder.value }
  /** @hidden */ set placeholder(v: SelectValueProps["placeholder"]) { this._s.placeholder.value = v }
}
